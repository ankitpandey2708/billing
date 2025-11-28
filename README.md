## 🎯 Overview

This system provides:
- **Mock API**: Simulates Finarkein's AA data fetch operations
- **Metering Service**: Standalone service that tracks usage and sends events to FlexPrice
- **FlexPrice Integration**: Production-ready integration with volume-based pricing
- **6 Client Models**: Support for all Finarkein client pricing strategies

## 📋 Features

### Pricing Models Supported

1. **Per-Fetch (CT Template)** - Cashfloat
   - ₹0.50 - ₹10.00 per fetch based on template type
   - Volume discounts: 10% at 10K, 20% at 50K fetches

2. **Per-User (Tiered by AA)** - Cusp Money
   - ₹2.50/user (single AA) to ₹3.25/user (multiple AAs)
   - Volume discounts: 10% at 1K, 20% at 5K users

3. **Per-Fetch (Purpose Code)** - Dvara
   - ₹1.50 - ₹7.00 per fetch based on purpose code
   - Volume discounts: 10% at 10K, 20% at 50K fetches

4. **Per-User (Flat)** - Spark Capital
   - ₹8.00 per user per month
   - Volume discounts: 10% at 1K, 20% at 5K users

5. **Hybrid (Fetch + Minimum)** - Fibe
   - ₹0.10 per fetch OR ₹2.00 minimum per user
   - Volume discounts: 10% at 50K, 20% at 200K fetches

6. **Per-User + Console** - PNB MetLife
   - ₹5.00 per AA user + ₹499 per console user
   - Volume discounts: 10% at 1K, 20% at 5K users

### Additional Services

- **Certification Fee**: ₹30,000 (one-time)


### Installation

```bash
# Install dependencies
npm install

# Create logs directory
mkdir logs
```

### Configuration

1. Update `.env` file with your FlexPrice API key (already configured):
```env
FLEXPRICE_API_KEY=sk_
FLEXPRICE_ENVIRONMENT=production
```

2. Configure FlexPrice dashboard following `docs/FLEXPRICE_SETUP.md`

### Running the Services

**Terminal 1: Start Mock API**
```bash
npm run mock-api
```
This starts the mock AA data fetch API on port 3000.

**Terminal 2: Start Metering Service**
```bash
npm start
```
This starts the metering service on port 3001.

**Terminal 3: Run Integration Demo**
```bash
node src/examples/integration-example.js
```
This runs a complete demo of all pricing models.

## 📚 API Documentation

### Mock API (Port 3000)

#### POST /api/v1/aa/fetch
Simulate a single AA data fetch.

**Request:**
```json
{
  "customerId": "cashfloat",
  "aaId": "AA_USER_123"
}
```

**Response:**
```json
{
  "success": true,
  "requestId": "req_abc123",
  "customerId": "cashfloat",
  "aaProvider": "setu",
  "fiType": "deposit",
  "ctTemplate": "template_basic",
  "aaId": "AA_USER_123",
  "fetchStatus": "success",
  "timestamp": "2025-11-26T14:00:00Z"
}
```

#### POST /api/v1/aa/fetch/bulk
Simulate bulk AA data fetches.

**Request:**
```json
{
  "customerId": "cusp_money",
  "count": 10
}
```

#### POST /api/v1/console/login
Simulate console user login.

**Request:**
```json
{
  "customerId": "pnb_metlife",
  "userId": "user_john",
  "userEmail": "john@pnbmetlife.com"
}
```

### Metering Service (Port 3001)

#### POST /metering/data-fetch
Track a data fetch event to FlexPrice.

**Request:**
```json
{
  "customerId": "cashfloat",
  "aaProvider": "setu",
  "fiType": "deposit",
  "ctTemplate": "template_basic",
  "aaId": "AA_USER_123",
  "fetchStatus": "success",
  "requestId": "req_abc123"
}
```

#### POST /metering/flush
Manually flush queued events to FlexPrice.

#### GET /metering/usage/:customerId
Get customer usage from FlexPrice.

**Query Parameters:**
- `startDate`: ISO date string
- `endDate`: ISO date string

#### GET /metering/invoices/:customerId
Get customer invoices from FlexPrice.

#### POST /metering/charge
Create one-time charge (certification/setup fees).

**Request:**
```json
{
  "customerId": "cashfloat",
  "amount": 30000,
  "description": "Certification Fee",
  "invoiceImmediately": true
}
```

## 🏗️ Architecture

```
┌─────────────────┐
│   Mock API      │  Simulates AA data fetch operations
│   (Port 3000)   │
└────────┬────────┘
         │
         │ HTTP Request
         ▼
┌─────────────────┐
│  Your Backend   │  (Future integration point)
│  Application    │
└────────┬────────┘
         │
         │ Metering Events
         ▼
┌─────────────────┐
│ Metering Service│  Validates & batches events
│   (Port 3001)   │
└────────┬────────┘
         │
         │ FlexPrice SDK
         ▼
┌─────────────────┐
│   FlexPrice     │  Usage tracking & billing
│   Cloud API     │
└─────────────────┘
```

## 📊 Event Schema

### Data Fetch Event (Official FlexPrice Format)
```json
{
  "event_name": "data.fetch",
  "external_customer_id": "cashfloat",
  "event_id": "unique_event_id",
  "timestamp": "2025-11-26T14:00:00Z",
  "properties": {
    "aa_provider": "setu",
    "fi_type": "deposit",
    "consent_type": "view",
    "purpose_code": "101",
    "ct_template": "template_basic",
    "aa_id": "AA_USER_123",
    "fetch_status": "success",
    "quantity": 1
  }
}
```
## 🧪 Testing

### Run Integration Demo

```bash
node src/examples/integration-example.js
```

This will:
1. Simulate data fetches for Cashfloat
2. Bulk fetch for Cusp Money
3. Purpose code fetch for Dvara
4. Console login for PNB MetLife
5. Customization work for Fibe
6. Create certification fee

### Manual Testing

**Test Data Fetch:**
```bash
curl -X POST http://localhost:3000/api/v1/aa/fetch \
  -H "Content-Type: application/json" \
  -d '{"customerId":"cashfloat","aaId":"AA_USER_123"}'
```

**Track Metering Event:**
```bash
curl -X POST http://localhost:3001/metering/data-fetch \
  -H "Content-Type: application/json" \
  -d '{
    "customerId":"cashfloat",
    "aaId":"AA_USER_123",
    "fetchStatus":"success",
    "requestId":"req_test_001",
    "ctTemplate":"template_basic"
  }'
```