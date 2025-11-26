# Finarkein Metering Event Schema

Event schema for tracking usage across FlexPrice billing dimensions.

## Event Types

### 1. Data Fetch Event

**Event Name**: `data_fetch`

**Purpose**: Track every AA data fetch operation for usage-based billing

**Schema**:
```json
{
  "event_name": "data_fetch",
  "customer_id": "cashfloat",
  "idempotency_key": "unique_request_id_12345",
  "timestamp": "2025-11-26T13:54:32+05:30",
  "properties": {
    "aa_provider": "setu",
    "fi_type": "deposit",
    "consent_type": "view",
    "purpose_code": "101",
    "ct_template": "template_basic",
    "aa_id": "AA_USER_12345",
    "fetch_status": "success",
    "quantity": 1,
    "request_id": "req_abc123",
    "session_id": "session_xyz789"
  }
}
```

**Field Descriptions**:
- `customer_id`: Finarkein client identifier (cashfloat, cusp_money, dvara, etc.)
- `idempotency_key`: Unique key to prevent duplicate billing on retries
- `timestamp`: ISO 8601 timestamp of the fetch operation
- `aa_provider`: Account Aggregator used (setu, anumati, finvu, nadl, onemoney, protean)
- `fi_type`: Financial Information type (deposit, securities, insurance, mutual_funds, etc.)
- `consent_type`: Type of consent (view, store, query, stream)
- `purpose_code`: ReBIT purpose code (101, 102, 103, etc.)
- `ct_template`: Consent template identifier (for Cashfloat pricing)
- `aa_id`: Unique AA user identifier (for per-user billing)
- `fetch_status`: success or failure (only bill successful fetches)
- `quantity`: Always 1 for single fetch
- `request_id`: Internal request tracking ID
- `session_id`: User session identifier

---

### 2. Console User Activity Event

**Event Name**: `console_user_active`

**Purpose**: Track monthly active console portal users

**Schema**:
```json
{
  "event_name": "console_user_active",
  "customer_id": "pnb_metlife",
  "timestamp": "2025-11-26T13:54:32+05:30",
  "properties": {
    "user_id": "user_john_doe",
    "user_email": "john@pnbmetlife.com",
    "activity_type": "login",
    "quantity": 1
  }
}
```

**Billing Logic**: Count unique `user_id` per customer per month, charge ₹499/user/month

---

### 3. Customization Hours Event

**Event Name**: `customization_hours`

**Purpose**: Track development/customization work hours

**Schema**:
```json
{
  "event_name": "customization_hours",
  "customer_id": "fibe",
  "timestamp": "2025-11-26T13:54:32+05:30",
  "properties": {
    "developer_id": "dev_ankit",
    "task_description": "Custom PFM dashboard integration",
    "hours": 8.5,
    "hourly_rate": 1200,
    "approved_by": "client_pm_name"
  }
}
```

**Billing Logic**: Sum `hours` × `hourly_rate` (₹1,200/hour)

---

## Pricing Model Mapping

### Per-Fetch Models

**Cashfloat (CT Template Based)**
```javascript
// FlexPrice aggregation rule
if (event.event_name === 'data_fetch' && 
    event.customer_id === 'cashfloat' && 
    event.properties.fetch_status === 'success') {
  
  const rate = {
    'template_basic': 0.50,
    'template_standard': 2.00,
    'template_premium': 10.00
  }[event.properties.ct_template];
  
  charge = rate * event.properties.quantity;
}
```

**Dvara (Purpose Code Based)**
```javascript
// FlexPrice aggregation rule
if (event.event_name === 'data_fetch' && 
    event.customer_id === 'dvara' && 
    event.properties.fetch_status === 'success') {
  
  const rate = {
    '101': 1.50,
    '102': 3.50,
    '103': 7.00
  }[event.properties.purpose_code];
  
  charge = rate * event.properties.quantity;
}
```

### Per-User-Per-Month Models

**Cusp Money (Tiered by AA Count)**
```javascript
// FlexPrice aggregation rule
// Step 1: Count unique aa_id per month
const uniqueUsers = countUnique(events, 'properties.aa_id');

// Step 2: Count unique aa_provider per month
const uniqueAAs = countUnique(events, 'properties.aa_provider');

// Step 3: Apply tier
const ratePerUser = uniqueAAs === 1 ? 2.50 : 3.25;

charge = uniqueUsers * ratePerUser;
```

**Spark Capital (Flat Rate)**
```javascript
// FlexPrice aggregation rule
const uniqueUsers = countUnique(events, 'properties.aa_id');
charge = uniqueUsers * 8.00;
```

**PNB MetLife (Base + Console)**
```javascript
// FlexPrice aggregation rule
const dataFetchUsers = countUnique(
  events.filter(e => e.event_name === 'data_fetch'), 
  'properties.aa_id'
);
const consoleUsers = countUnique(
  events.filter(e => e.event_name === 'console_user_active'), 
  'properties.user_id'
);

charge = (dataFetchUsers * 5.00) + (consoleUsers * 499.00);
```

### Hybrid Model

**Fibe (Per-Fetch with Minimum)**
```javascript
// FlexPrice aggregation rule
const fetchCount = events.filter(
  e => e.event_name === 'data_fetch' && 
  e.properties.fetch_status === 'success'
).length;

const uniqueUsers = countUnique(events, 'properties.aa_id');

const fetchCharge = fetchCount * 0.10;
const minimumCharge = uniqueUsers * 2.00;

charge = Math.max(fetchCharge, minimumCharge);
```

---

## Event Validation Rules

### Required Fields
All events must include:
- `event_name`
- `customer_id`
- `idempotency_key`
- `timestamp`

### Data Fetch Specific
- `fetch_status` must be "success" to be billable
- `aa_id` must be present for per-user models
- `ct_template` must be present for Cashfloat
- `purpose_code` must be present for Dvara

### Idempotency
- Use `idempotency_key` to prevent duplicate billing
- Format: `{customer_id}_{request_id}_{timestamp}`
- FlexPrice will deduplicate events with same idempotency key

---

## Event Volume Estimates

Based on typical usage patterns:

| Client | Monthly Fetches | Monthly Users | Events/Month |
|--------|----------------|---------------|--------------|
| Cashfloat | 50,000 | 5,000 | 50,000 |
| Cusp Money | 30,000 | 3,000 | 30,000 |
| Dvara | 20,000 | 2,000 | 20,000 |
| Spark Capital | 10,000 | 1,000 | 10,000 |
| Fibe | 100,000 | 10,000 | 100,000 |
| PNB MetLife | 15,000 | 1,500 | 15,000 + console events |

**Total**: ~225,000 events/month

FlexPrice can easily handle this volume with real-time processing.
