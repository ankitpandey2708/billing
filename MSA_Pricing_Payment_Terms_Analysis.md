# Finarkein MSA Pricing Analysis
**All 7 Client Agreements Analyzed**

## Summary

We analyzed 7 client agreements using Gemini API. All documents parsed successfully.

**What we found:**
- 2 pricing models: per-transaction and per-user
- Setup fees range from ₹0 to ₹6,00,000
- Standard certification: ₹30,000
- Missing: payment terms, late fees, minimums

---

## Pricing by Client

| Client | Setup | Cert | Model | Rate | Notes |
|--------|-------|------|-------|------|-------|
| Cashfloat | Free | ₹30K | Per fetch | ₹0.50-₹10 | Template-based |
| Cusp Money | Free | ₹30K | Per user/mo | ₹2.50-₹3.25 | Tiered by AAs |
| Dvara | - | ₹30K | Per fetch | ₹1.50-₹7 | Use-case based |
| Infomatics | - | TBD | Per user/mo | Redacted | + Console fee |
| Spark Capital | - | ₹35K | Per user/mo | ₹8 | Includes TSP |
| Fibe | ₹6L | ₹30K | Hybrid | ₹0.10 + ₹2 min | PFM solution |
| PNB MetLife | - | TBD | Per user/mo | ₹5 + ₹499 | NERV solution |

---

## Pricing Models

### Model 1: Per Transaction (3 clients)

**How it works:** Pay per data fetch from financial institutions.

**Rates:**
- Cashfloat: ₹0.50 to ₹10 (varies by template)
- Dvara: ₹1.50 to ₹7 (varies by use case)
- Fibe: ₹0.10 per fetch (minimum ₹2/user/month)

**Best for:** Variable usage, unpredictable volumes

### Model 2: Per User Per Month (4 clients)

**How it works:** Fixed monthly fee per active user.

**Rates:**
- Cusp Money: ₹2.50 to ₹3.25
- PNB MetLife: ₹5 (+ ₹499 console)
- Spark Capital: ₹8
- Infomatics: Redacted

**Best for:** Predictable revenue, stable user base

---

## Fee Structure

### One-Time Fees

**Setup Fee:**
- 2 clients: Free
- 1 client: ₹6,00,000 (Fibe only)
- 4 clients: Not charged

**Certification Fee:**
- Standard: ₹30,000 (5 clients)
- Premium: ₹35,000 (Spark Capital)
- Not specified: 2 clients

### Recurring Fees

**Usage Fees:**
- Charged monthly based on actual usage
- Billed in arrears

**Console Access:**
- PNB MetLife: ₹499/user/month
- Infomatics: Redacted
- Others: Not offered separately

### Variable Fees

**Customization:**
- Standard: ₹1,200/hour
- Cashfloat/Cusp: Free for 6 months
- Fibe: Free Year 1, then 20% of cost

---

## Payment Schedule

**Standard timeline across all clients:**

1. **Upon signing:** Setup fee (if any)
2. **Before go-live:** Certification fee
3. **Monthly:** Usage fees
4. **As needed:** Customization fees

---

## What's Included vs Excluded

### Included in Pricing
✅ Account Aggregator (AA) fees
✅ Standard support
✅ API access
✅ Basic integrations

### Not Included (Client Pays)
❌ Financial Information Provider (FIP) fees
❌ GST and other taxes
❌ Custom development beyond scope
❌ Third-party services

---

## Pricing Patterns

### By Use Case (Dvara Model)

| Use Case | Rate | Why |
|----------|------|-----|
| Loan underwriting | ₹4.50 | High value decision |
| Employee monitoring | ₹4.50 | Compliance critical |
| Loan monitoring | ₹3.25 | Ongoing tracking |
| Loan collections | ₹1.50 | Low complexity |

**Insight:** Price matches business value.

### By Template (Cashfloat Model)

| Template | Rate | Data Type |
|----------|------|-----------|
| CT001 | ₹3.50 | Full bank statements |
| CT003 | ₹2.50 | Simplified data |
| CT035 | ₹0.50 | Basic info |

**Insight:** More data = higher price.

### By Number of AAs (Cusp Model)

| AAs Used | Rate |
|----------|------|
| 1 AA | ₹2.50/user |
| 2 AAs | ₹3.25/user |

**Insight:** Multi-AA access costs more.

---

## Value-Added Services

| Service | Rate | Clients |
|---------|------|---------|
| Bank statement analytics | ₹7-₹10/account | Cashfloat, Dvara |
| GST analysis | ₹10/account | Cashfloat |
| Console portal | ₹499/user/month | PNB MetLife |
| TSP module | Included | Spark Capital |

---

## Promotional Offers

### Active Offers

**Free customization (6 months):**
- Cashfloat
- Cusp Money

**10% monthly discount:**
- Fibe only
- Max ₹50,000
- Requires 4 joint PRs/year

**Free Year 1 customization:**
- Fibe only
- Then 20% of cost

---

## Gaps in Current Agreements

### Missing Payment Terms
- No Net 30/45/60 specified
- No late payment penalties
- No payment method requirements
- No invoice format details
- No dispute process

### Missing Revenue Protection
- No minimum monthly fees
- No volume commitments
- No contract duration (most)
- No cancellation terms
- No SLA penalties

### Missing Cost Controls
- No FIP fee caps
- No price increase limits
- No change order process
- No budget approvals

---

## Action Items

### 1. Standardize Payment Terms

**Add to all new contracts:**
- Payment due: Net 30 days
- Late fee: 1.5% per month
- Method: NEFT/RTGS/UPI
- Invoice: Email within 5 days
- Disputes: 7 days to raise

### 2. Set Minimum Fees

**By client tier:**
- Enterprise: ₹50,000/month minimum
- Mid-market: ₹25,000/month minimum
- SMB: ₹10,000/month minimum

**Why:** Ensures profitability for low-volume clients.

### 3. Add Volume Discounts

**Suggested tiers:**
- 0-10K transactions: Standard rate
- 10K-50K: 10% discount
- 50K-100K: 15% discount
- 100K+: 20% discount

**Why:** Rewards high-volume clients, increases retention.

### 4. Create FIP Fee Policy

**New clause:**
- FIP fees passed through as-is
- Separate line item on invoice
- Monthly reconciliation
- Cap at 50% of usage fee
- Quarterly review with client

**Why:** Transparency and cost control.

### 5. Tier Console Access

**Pricing structure:**
- Basic: ₹299/user (read-only)
- Standard: ₹499/user (current PNB rate)
- Premium: ₹999/user (analytics, exports)

**Why:** Monetize different feature levels.

### 6. Define Customization Limits

**New policy:**
- Year 1: Free up to 40 hours
- Year 2: ₹1,000/hour (20% off)
- Year 3+: ₹1,200/hour (standard)
- Large projects: 15-20% of total cost

**Why:** Balances client acquisition with profitability.

### 7. Require Annual Contracts

**Minimum term:**
- 12 months for all clients
- Auto-renewal unless 60 days notice
- Early termination: 3 months fees

**Why:** Predictable revenue, reduces churn.

---

## Pricing Strategy by Segment

### Enterprise Clients (>10K users)

**Setup:** ₹5L-₹10L for complex solutions
**Certification:** ₹50K-₹100K
**Usage:** Volume discounts (15-20%)
**Extras:** Dedicated support, custom SLAs
**Contract:** 2-3 years, annual review

### Mid-Market (1K-10K users)

**Setup:** Waived
**Certification:** ₹30K standard
**Usage:** ₹3-₹8/user or ₹1-₹5/transaction
**Extras:** Standard support
**Contract:** 1 year minimum

### SMB/Startups (<1K users)

**Setup:** Waived
**Certification:** Waived Year 1
**Usage:** ₹2-₹3/user or ₹0.50-₹2/transaction
**Minimum:** ₹10K/month
**Extras:** Email support only
**Contract:** 1 year, case study required

---

## Competitive Positioning

### Our Strengths
1. Flexible pricing (transaction or user-based)
2. AA fees included (simplifies billing)
3. No lock-in (most contracts)
4. Use-case pricing (fair value)

### Our Weaknesses
1. No payment terms (cash flow risk)
2. No minimums (unprofitable small clients)
3. Inconsistent pricing (hard to scale)
4. FIP fee uncertainty (client concern)

### Quick Wins
1. Add Net 30 terms to all contracts
2. Set ₹10K minimum for new clients
3. Create standard pricing tiers
4. Cap FIP fees at 50% of usage

---

## Implementation Checklist

### Immediate (This Month)
- [ ] Add payment terms to contract template
- [ ] Define late payment penalties
- [ ] Set minimum monthly fees by tier
- [ ] Create FIP fee policy document

### Short-Term (Next Quarter)
- [ ] Build pricing calculator tool
- [ ] Create volume discount structure
- [ ] Tier console access pricing
- [ ] Standardize customization rates

### Long-Term (Next 6 Months)
- [ ] Implement automated billing system
- [ ] Add usage monitoring dashboard
- [ ] Create client self-service portal
- [ ] Build FIP fee reconciliation process

---

## Data Sources

**Analyzed documents:**
1. sow_credflow.pdf (Cashfloat)
2. sow_Cuspmoney.docx (Cusp Money)
3. sow_dvara.pdf (Dvara)
4. sow_infomatics.docx (Redacted)
5. sow_SPARK CAPITAL.pdf (Spark Capital)
6. sow_fibe_portfos.pdf (Fibe)
7. sow_pmli_nerv.pdf (PNB MetLife)

**Analysis tool:** Gemini API (models/gemini-2.5-pro)
**Success rate:** 100% (7 of 7)
**Date:** November 20, 2025
