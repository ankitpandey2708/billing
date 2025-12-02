## Step 1: Create Customers

Navigate to **Customers** in the FlexPrice dashboard and create the following customers:

### Customer List

1. **Cashfloat**
   - Customer ID: `cashfloat`
   - Name: Cashfloat
   - Email: billing@cashfloat.com


---

## Step 2: Create Metered Features

Navigate to **Product Catalog → Features** and create the following metered features:

### Feature 1: Data Fetch

- **Name**: Data Fetch
- **Type**: Metered
- **Event Name**: `data.fetch`
- **Aggregation Function**: Count
- **Usage Reset**: Periodic (Monthly)
- **Unit Name**: fetch / fetches

This is the base feature for counting data fetches.

### Feature 2: Data Fetch by CT Template (Cashfloat)

Create separate features for each CT template tier:

**Feature 2a: Data Fetch - CT001**
- **Name**: Data Fetch - CT001
- **Type**: Metered
- **Event Name**: `data.fetch`
- **Aggregation Function**: Count
- **Event Filters**: 
  - Property: `ct_template`
  - Operator: `equals`
  - Value: `CT001`
- **Usage Reset**: Periodic (Monthly)
- **Unit Name**: fetch / fetches

**Feature 2b: Data Fetch - CT002**
- Same as above, but filter for `ct_template = CT002`

**Feature 2c: Data Fetch - CT003**
- Same as above, but filter for `ct_template = CT003`

### Feature 3: Data Fetch by Purpose Code (Dvara)

Create separate features for each purpose code tier:

**Feature 3a: Data Fetch - Purpose 101**
- **Name**: Data Fetch - Purpose 101
- **Type**: Metered
- **Event Name**: `data.fetch`
- **Aggregation Function**: Count
- **Event Filters**: 
  - Property: `purpose_code`
  - Operator: `equals`
  - Value: `101`
- **Usage Reset**: Periodic (Monthly)

**Feature 3b: Data Fetch - Purpose 102**
- Filter for `purpose_code = 102`

**Feature 3c: Data Fetch - Purpose 103**
- Filter for `purpose_code = 103`

### Feature 4: Active Users (Per-User Models)

- **Name**: Active AA Users
- **Type**: Metered
- **Event Name**: `data.fetch`
- **Aggregation Function**: Count Unique
- **Aggregation Field**: `aa_id`
- **Usage Reset**: Periodic (Monthly)
- **Unit Name**: user / users

### Feature 5: Console Users

- **Name**: Console Portal Users
- **Type**: Metered
- **Event Name**: `console.user.active`
- **Aggregation Function**: Count Unique
- **Aggregation Field**: `user_id`
- **Usage Reset**: Periodic (Monthly)
- **Unit Name**: user / users

---

## Step 3: Create Pricing Plans

Navigate to **Product Catalog → Plans** and create plans for each customer:

### Plan 1: Cashfloat - CT Template Based

**Plan Name**: Cashfloat Plan

**Usage-Based Charges**:

1. **Template Basic Fetches**
   - Feature: Data Fetch - Template Basic
   - Billing Model: Volume-Based Pricing
   - Currency: INR
   - Billing Period: Monthly
   - Billing Timing: Arrears
   - **Volume Tiers**:
     - 0 - 10,000 fetches: ₹0.50 per fetch
     - 10,001 - 50,000 fetches: ₹0.45 per fetch
     - 50,001+ fetches: ₹0.40 per fetch


### Plan 2: Cusp Money - Tiered by AA Count

**Plan Name**: Cusp Money Plan

**Usage-Based Charges**:

1. **Active Users (Single AA)**
   - Feature: Active AA Users
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 1,000 users: ₹2.50 per user
     - 1,001 - 5,000 users: ₹2.25 per user
     - 5,001+ users: ₹2.00 per user

> **Note**: For multi-AA pricing (₹3.25), you'll need to create a separate plan or use customer-specific overrides based on AA provider count.

### Plan 3: Dvara - Purpose Code Based

**Plan Name**: Dvara Plan

**Usage-Based Charges**:

1. **Purpose 101 Fetches**
   - Feature: Data Fetch - Purpose 101
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 10,000 fetches: ₹1.50 per fetch
     - 10,001 - 50,000 fetches: ₹1.35 per fetch
     - 50,001+ fetches: ₹1.20 per fetch

2. **Purpose 102 Fetches**
   - Feature: Data Fetch - Purpose 102
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 10,000 fetches: ₹3.50 per fetch
     - 10,001 - 50,000 fetches: ₹3.15 per fetch
     - 50,001+ fetches: ₹2.80 per fetch

3. **Purpose 103 Fetches**
   - Feature: Data Fetch - Purpose 103
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 5,000 fetches: ₹7.00 per fetch
     - 5,001 - 20,000 fetches: ₹6.30 per fetch
     - 20,001+ fetches: ₹5.60 per fetch


### Plan 5: Fibe - Hybrid Model

**Plan Name**: Fibe Plan

**Usage-Based Charges**:

1. **Data Fetches**
   - Feature: Data Fetch - Basic
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 50,000 fetches: ₹0.10 per fetch
     - 50,001 - 200,000 fetches: ₹0.09 per fetch
     - 200,001+ fetches: ₹0.08 per fetch

2. **Minimum Monthly Charge**
   - Feature: Active AA Users
   - Billing Model: Flat Fee
   - Price: ₹2.00 per user

> **Note**: FlexPrice will automatically apply the higher of the two charges.

### Plan 6: PNB MetLife - User + Console

**Plan Name**: PNB MetLife Plan

**Usage-Based Charges**:

1. **Active AA Users**
   - Feature: Active AA Users
   - Billing Model: Volume-Based Pricing
   - **Volume Tiers**:
     - 0 - 1,000 users: ₹5.00 per user
     - 1,001 - 5,000 users: ₹4.50 per user
     - 5,001+ users: ₹4.00 per user

2. **Console Portal Users**
   - Feature: Console Portal Users
   - Billing Model: Flat Fee
   - Price: ₹499.00 per user

### Plan 7: Customization (All Clients)

**Plan Name**: Customization Services

**Usage-Based Charges**:

1. **Customization Hours**
   - Feature: Customization Hours
   - Billing Model: Flat Fee
   - Price: ₹1,200.00 per hour

---

## Step 4: Create Subscriptions

Navigate to **Subscriptions** and create subscriptions for each customer:

1. **Cashfloat** → Cashfloat Plan
2. **Cusp Money** → Cusp Money Plan
3. **Dvara** → Dvara Plan
4. **Spark Capital** → Spark Capital Plan
5. **Fibe** → Fibe Plan
6. **PNB MetLife** → PNB MetLife Plan

For each subscription:
- **Billing Cycle**: Monthly
- **Start Date**: Current date
- **Auto-renew**: Yes

---

## Step 5: Configure One-Time Charges

For setup and certification fees, use the **Charges** API or dashboard:

### Certification Fees (One-time)

Create one-time charges for each customer:

```bash
# Example: Cashfloat Certification Fee
curl -X POST https://api.flexprice.io/v1/charges \
  -H "Authorization: Bearer sk_01KAZNF267HCD1MABRASMQS2WG" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "cashfloat",
    "amount": 30000,
    "currency": "INR",
    "description": "Certification Fee",
    "invoice_immediately": true
  }'
```

### Setup Fees

- **Fibe**: ₹600,000 (one-time)
- Others: ₹0 (free)

---

## Step 6: Test Event Ingestion

Send test events to verify configuration:

```bash
# Test data fetch event
curl -X POST https://api.flexprice.io/v1/events \
  -H "Authorization: Bearer sk_01KAZNF267HCD1MABRASMQS2WG" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "data.fetch",
    "customer_id": "cashfloat",
    "idempotency_key": "test_001",
    "timestamp": "2025-11-26T14:00:00Z",
    "properties": {
      "aa_provider": "setu",
      "fi_type": "deposit",
      "ct_template": "template_basic",
      "aa_id": "AA_USER_TEST",
      "fetch_status": "success",
      "quantity": 1
    }
  }'
```

---

