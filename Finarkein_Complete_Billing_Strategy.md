# Finarkein Complete Billing Strategy

## Summary

This document combines our MSA analysis (7 client agreements) with our AA market research (7 AAs + 3 TSPs) to create a complete billing strategy.

**What we know:**
- Current client pricing: ₹0.50 to ₹8/user (wide range)
- AA market rates: ₹0.01 to ₹30/fetch
- Our position: Multi-AA orchestrator with analytics
- Our strategy: 5-tier TSP pricing + AA pass-through

---

## Part 1: What We Charge Today

### Current Client Pricing

| Client | Setup | Cert | Model | Rate | Special Terms |
|--------|-------|------|-------|------|---------------|
| Cashfloat | Free | ₹30K | Per fetch | ₹0.50-₹10 | Template-based |
| Cusp Money | Free | ₹30K | Per user/mo | ₹2.50-₹3.25 | Tiered by AAs |
| Dvara | - | ₹30K | Per fetch | ₹1.50-₹7 | Use-case based |
| Infomatics | - | TBD | Per user/mo | Redacted | Console fee |
| Spark Capital | - | ₹35K | Per user/mo | ₹8 | TSP module |
| Fibe | ₹6L | ₹30K | Hybrid | ₹0.10 + ₹2 min | PFM solution |
| PNB MetLife | - | TBD | Per user/mo | ₹5 + ₹499 | NERV solution |

### Current Pricing Models

**Model 1: Per Transaction (3 clients)**
- Cashfloat: ₹0.50 to ₹10
- Dvara: ₹1.50 to ₹7
- Fibe: ₹0.10 (minimum ₹2/user)

**Model 2: Per User Per Month (4 clients)**
- Cusp Money: ₹2.50 to ₹3.25
- PNB MetLife: ₹5 + ₹499 console
- Spark Capital: ₹8
- Infomatics: Redacted

### Current Fee Structure

**One-Time Fees:**
- Setup: Free (most) or ₹6L (Fibe only)
- Certification: ₹30K standard, ₹35K premium

**Recurring Fees:**
- Usage: Billed monthly in arrears
- Console: ₹499/user (PNB MetLife only)

**Variable Fees:**
- Customization: ₹1,200/hour
- Free for 6 months (some clients)
- Fibe: Free Year 1, then 20% of cost

### What's Missing Today

**Payment Terms:**
- No Net 30/45/60 specified
- No late payment penalties
- No payment method requirements
- No minimum monthly fees
- No volume commitments

**Cost Controls:**
- No FIP fee caps
- No price increase limits
- No contract duration (most)

---

## Part 2: Market Pricing (AA Ecosystem)

### Account Aggregators (Licensed)

| Provider | Price Range | Model | Notes |
|----------|-------------|-------|-------|
| Setu AA | ₹0.01 - ₹25 | Use-case | Varies by FIU type |
| Anumati | ₹1 - ₹25 | Data-type | ₹1 profile, ₹5-25 statements |
| Finvu | ₹20 - ₹30 | Volume | Discounts available |
| NADL | ₹2 | Flat | All-inclusive |
| Onemoney | ₹0.30 - ₹11 | Per-account | ₹0.30 balance, ₹11 all |
| Protean | ₹2 - ₹10 | Per-fetch | Varies by range |
| CAMS | Not public | Volume | Contact required |

### Tech Providers (Not Licensed)

| Provider | Pricing | Features |
|----------|---------|----------|
| Moneyone | Not public | Basic pipe, single AA |
| Ignosis | Not public | 6 AAs, no auto-retry |
| Saafe | Not public | Unknown features |

### Market Insights

**AA Cost Range:** ₹0.01 to ₹30 per fetch
**Average AA Cost:** ₹5 to ₹10 per fetch
**TSP Pricing:** Not publicly available (custom)

**What this means:**
- AA charges are the base cost (like toll roads)
- TSP fees are where we add value
- Our competitors don't publish TSP rates

---

## Part 3: Our Competitive Advantage

### What Makes Us Different

**Multi-AA Coverage:**
- We connect: 12 AAs (8 deep)
- Competitors: 5-6 AAs max
- Benefit: Better uptime, wider coverage

**Smart Routing:**
- Health-based switching
- Auto-retry on failures
- Less than 30% on any single AA
- Benefit: 99%+ uptime guarantee

**More Data:**
- 10 financial instrument types
- Competitors: 1-5 types
- Benefit: Complete financial view

**Built-In Analytics:**
- Income verification (all types)
- Spend categorization
- Portfolio tracking
- Cross-analysis (bank + GST/investments)
- Benefit: Insights, not just data

### Feature Comparison

| Feature | Us | Ignosis | Moneyone |
|---------|-----|---------|----------|
| AAs Connected | 12 | 6 | 5 |
| Multi-AA Routing | Yes | Maybe | No |
| Auto-Retry | Yes | No | No |
| Auto-Fetch | Yes | No | No |
| Income Analysis | Yes | Yes | No |
| Portfolio Analysis | Yes | Yes | No |
| Cross-Analysis | Yes | No | No |
| Concentration Risk | <30% | >85% | >90% |

**Bottom line:** We're the only enterprise-grade solution.

---

## Part 4: Two Types of Costs

### 1. AA Charges (Pass-Through)

**What it is:** Fee from licensed aggregators
**Who pays:** Client (at actual cost)
**Our role:** Pass through, no markup
**Range:** ₹0.01 to ₹30 per fetch
**Included:** All AA fees
**Not included:** FIP fees (if any)

### 2. TSP Fees (Our Revenue)

**What it is:** Fee for our platform
**Who pays:** Client (our service charge)
**Our role:** This is our revenue
**Range:** ₹5 to ₹50 per fetch (by tier)
**Included:** Platform, routing, analytics
**Not included:** Custom development

**Total client cost = TSP fee + AA charge**

**Example:**
- TSP fee: ₹15/fetch
- AA charge: ₹5/fetch
- Total: ₹20/fetch

---

## Part 5: New Pricing Strategy

### Tier 1: Basic (₹5-₹8 per fetch)

**Who it's for:** Small clients, testing

**Features:**
- Single AA routing
- Basic API access
- Email support

**Total cost:** ₹5-8 + AA charge
**Best for:** Low volume, simple needs

### Tier 2: Reliable (₹10-₹15 per fetch)

**Who it's for:** Mid-size clients needing uptime

**Features:**
- Multi-AA routing
- Health-based switching
- Auto-fetch and retry
- Standard support

**Total cost:** ₹10-15 + AA charge
**Best for:** Production use, reliability matters

### Tier 3: Analytics (₹20-₹30 per fetch)

**Who it's for:** Lenders, underwriters

**Features:**
- Everything in Tier 2
- Bank statement analysis
- Income verification
- Spend categorization
- Cashflow analysis

**Total cost:** ₹20-30 + AA charge
**Best for:** Lending decisions, underwriting

### Tier 4: Advanced (₹35-₹50 per fetch)

**Who it's for:** Large FIUs, complex needs

**Features:**
- Everything in Tier 3
- Portfolio analysis
- GST cross-analysis
- Fraud detection
- Custom analytics

**Total cost:** ₹35-50 + AA charge
**Best for:** Wealth management, fraud prevention

### Tier 5: Enterprise (Custom)

**Who it's for:** Banks, large NBFCs

**Features:**
- Platform license
- Custom workflows
- Dedicated support
- SLA guarantees
- White-label options

**Pricing:** Platform fee + per-fetch + AA charge
**Best for:** Custom integration, high volume

### Volume Discounts

| Monthly Fetches | Discount |
|-----------------|----------|
| 10K - 50K | 10% off |
| 50K - 100K | 15% off |
| 100K - 500K | 20% off |
| 500K+ | 30% off |

---

## Part 6: Pricing Examples

### Example 1: Small Lender (Tier 2)

**Profile:**
- 5K fetches/month
- Needs reliability
- Basic underwriting

**Costs:**
- TSP fee: ₹12 × 5K = ₹60,000
- AA charges: ₹5 × 5K = ₹25,000
- **Total: ₹85,000/month**

### Example 2: Mid-Size NBFC (Tier 3)

**Profile:**
- 50K fetches/month
- Needs analytics
- Income verification

**Costs:**
- TSP fee: ₹25 × 50K = ₹12,50,000
- Volume discount: 10% = -₹1,25,000
- Net TSP: ₹11,25,000
- AA charges: ₹5 × 50K = ₹2,50,000
- **Total: ₹13,75,000/month**

### Example 3: Large Bank (Tier 5)

**Profile:**
- 500K fetches/month
- Custom workflows
- Dedicated support

**Costs:**
- Platform fee: ₹5,00,000
- TSP fee: ₹15 × 500K = ₹75,00,000
- Volume discount: 30% = -₹22,50,000
- Net TSP: ₹52,50,000
- AA charges: ₹3 × 500K = ₹15,00,000
- **Total: ₹72,50,000/month**

---

## Part 7: Mapping Current Clients to New Tiers

### Client Migration Plan

| Current Client | Current Rate | Suggested Tier | New Rate | Rationale |
|----------------|--------------|----------------|----------|-----------|
| Cashfloat | ₹0.50-₹10 | Tier 3 | ₹20-30 | Uses analytics |
| Cusp Money | ₹2.50-₹3.25 | Tier 2 | ₹10-15 | Needs reliability |
| Dvara | ₹1.50-₹7 | Tier 3 | ₹20-30 | Use-case analytics |
| Spark Capital | ₹8 | Tier 4 | ₹35-50 | TSP module |
| Fibe | ₹0.10 + ₹2 | Tier 4 | ₹35-50 | PFM analytics |
| PNB MetLife | ₹5 + ₹499 | Tier 3 | ₹20-30 | Basic analytics |

**Note:** These are suggestions. Actual migration needs client discussion.

---

## Part 8: Standard Terms (New for All Contracts)

### Payment Terms

**Payment Due:** Net 30 days from invoice
**Late Fee:** 1.5% per month (18% APR)
**Payment Method:** NEFT/RTGS/UPI
**Invoice:** Email within 5 business days
**Disputes:** 7 days to raise

### Minimum Fees

**By client tier:**
- Enterprise: ₹50,000/month minimum
- Mid-market: ₹25,000/month minimum
- SMB: ₹10,000/month minimum

**Why:** Ensures profitability for all clients

### Contract Terms

**Duration:** 12 months minimum
**Renewal:** Auto-renew unless 60 days notice
**Early Exit:** 3 months fees as penalty

### FIP Fee Policy

**Pass-Through:** At actual cost
**Billing:** Separate line item
**Cap:** Maximum 50% of usage fee
**Review:** Quarterly with client

---

## Part 9: Implementation Roadmap

### Month 1-2: Foundation

**Build:**
- [ ] Per-fetch tracking system
- [ ] Tier-based billing logic
- [ ] AA cost pass-through tracking
- [ ] Payment terms in contracts

**Launch:**
- [ ] Tier 1 and 2 pricing
- [ ] Basic volume discounts
- [ ] New contract template

### Month 3-4: Analytics

**Build:**
- [ ] Module-wise usage tracking
- [ ] Analytics feature flags
- [ ] Add-on billing system

**Launch:**
- [ ] Tier 3 pricing
- [ ] Analytics add-ons
- [ ] Migrate 5 pilot clients

### Month 5-6: Enterprise

**Build:**
- [ ] Platform fee structures
- [ ] SLA credit system
- [ ] Custom pricing engine

**Launch:**
- [ ] Tier 4 and 5 pricing
- [ ] Enterprise contracts
- [ ] Self-service pricing tool

---

## Part 10: Sales Playbook

### Tier 1 Pitch
"Get started with AA integration for ₹5-8 per fetch. Perfect for testing or low-volume use cases."

### Tier 2 Pitch
"Never worry about downtime. Our multi-AA routing ensures 99%+ uptime for just ₹10-15 per fetch."

### Tier 3 Pitch
"Get analyzed data, not raw data. Income verification and spend analysis included at ₹20-30 per fetch."

### Tier 4 Pitch
"Complete financial intelligence. Portfolio tracking, fraud detection, and cross-analysis at ₹35-50 per fetch."

### Tier 5 Pitch
"Enterprise-grade platform with custom workflows and dedicated support. Let's discuss your needs."

### Handling Objections

**"Your competitor is cheaper"**
Response: "Let's compare total cost. Our 99%+ uptime means no lost revenue. What's downtime worth to you?"

**"Why pay for analytics?"**
Response: "You're already paying for raw data. We turn it into decisions. Our income verification saves 2-3 hours per application."

**"I only need one AA"**
Response: "Start with Tier 1 at ₹5-8 per fetch. When you need reliability, upgrade to Tier 2."

**"Can you match their price?"**
Response: "We can't match on price alone. But we can show value. Let's run a pilot and measure impact."

---

## Part 11: Migration Strategy

### For Existing Clients

**Step 1: Audit (Week 1-2)**
- Track current fetches/month
- Identify features used
- Calculate current costs
- Map to appropriate tier

**Step 2: Proposal (Week 3)**
- Show tier recommendation
- Calculate new pricing
- Highlight value gained
- Offer transition discount

**Step 3: Transition (Month 1-3)**
- Grandfather pricing for 3 months
- Phase in new tiers
- Monitor usage
- Adjust as needed

### For New Clients

**Step 1: Discovery**
- Understand use case
- Estimate volume
- Identify must-have features
- Budget constraints

**Step 2: Recommend**
- Match needs to tier
- Show cost breakdown
- Explain value proposition
- Provide alternatives

**Step 3: Onboard**
- Start with appropriate tier
- Monitor usage patterns
- Suggest upgrades when ready
- Track satisfaction

---

## Part 12: Key Metrics to Track

### Revenue Metrics
- Average revenue per fetch
- Revenue by tier
- Volume discount impact
- TSP revenue vs AA cost ratio
- Monthly recurring revenue (MRR)

### Usage Metrics
- Fetches per client per month
- Tier distribution
- Feature adoption rate
- Upgrade/downgrade rate
- Churn rate by tier

### Operational Metrics
- AA cost per fetch (actual)
- Gross margin by tier
- Support cost by tier
- Infrastructure cost per fetch
- Customer acquisition cost (CAC)

### Client Health Metrics
- Net promoter score (NPS)
- Support ticket volume
- Time to value
- Feature utilization
- Payment delays

---

## Part 13: Pricing Patterns Across Clients

### By Use Case

| Use Case | Current Rate | Suggested Tier | New Rate |
|----------|--------------|----------------|----------|
| Loan underwriting | ₹3.50-₹4.50 | Tier 3 | ₹20-30 |
| Loan monitoring | ₹3.25 | Tier 2 | ₹10-15 |
| Loan collections | ₹1.50 | Tier 2 | ₹10-15 |
| Employee monitoring | ₹4.50 | Tier 3 | ₹20-30 |
| PFM solutions | ₹0.10 + min | Tier 4 | ₹35-50 |
| Wealth management | ₹8 | Tier 4 | ₹35-50 |

### By Data Type

| Data Type | Current Rate | AA Cost | TSP Fee |
|-----------|--------------|---------|---------|
| Balance only | ₹0.30-₹0.50 | ₹0.30 | ₹5-8 |
| Profile | ₹1-₹3 | ₹1-3 | ₹5-8 |
| Statements | ₹2.50-₹10 | ₹5-10 | ₹10-30 |
| All data | ₹8-₹11 | ₹5-10 | ₹20-50 |

### By Client Size

| Client Size | Current Avg | Suggested Tier | New Avg |
|-------------|-------------|----------------|---------|
| Small (<10K/mo) | ₹2-₹5 | Tier 1-2 | ₹10-15 |
| Mid (10K-100K/mo) | ₹3-₹8 | Tier 2-3 | ₹15-25 |
| Large (100K+/mo) | ₹5-₹10 | Tier 3-5 | ₹20-40 |

---

## Part 14: Competitive Positioning

### Our Strengths
1. **Coverage:** 12 AAs vs 5-6 for competitors
2. **Reliability:** <30% concentration vs >85% for others
3. **Analytics:** Complete suite vs basic or none
4. **Flexibility:** 5 tiers vs one-size-fits-all

### Our Weaknesses
1. **Price:** Higher than basic pipes
2. **Complexity:** More features = steeper learning
3. **Lock-in:** 12-month contracts
4. **Transparency:** TSP + AA = two line items

### Quick Wins
1. Add Net 30 terms to all contracts (this month)
2. Set ₹10K minimum for new clients (this month)
3. Create pricing calculator (next month)
4. Cap FIP fees at 50% (this quarter)

---

## Part 15: Action Items

### Immediate (This Month)
- [ ] Finalize tier pricing
- [ ] Add payment terms to contracts
- [ ] Define late payment penalties
- [ ] Set minimum monthly fees
- [ ] Create FIP fee policy
- [ ] Train sales team on tiers

### Short-Term (Next Quarter)
- [ ] Build billing system
- [ ] Create pricing calculator
- [ ] Launch Tier 1-3
- [ ] Migrate 10 pilot clients
- [ ] Measure gross margins
- [ ] Build volume discount automation

### Long-Term (Next 6 Months)
- [ ] Launch Tier 4-5
- [ ] Implement self-service pricing
- [ ] Expand to 50+ clients
- [ ] Build client dashboard
- [ ] Automate FIP reconciliation
- [ ] Create upgrade/downgrade flows

---

## Appendix A: Current Client Details

### Cashfloat (Credflow)
- **Model:** Per fetch (template-based)
- **Rates:** 
  - CT001: ₹3.50/fetch (full bank statements)
  - CT003: ₹2.50/fetch (simplified data)
  - CT035: ₹0.50/fetch (basic info)
  - Bank statement analysis: ₹10/account
  - GST analysis: ₹10/account
- **Setup:** Free
- **Cert:** ₹30K
- **Special:** Free customization 6 months
- **Suggested:** Tier 3 (analytics user)

### Cusp Money
- **Model:** Per user/month (tiered)
- **Rates:** ₹2.50 (1 AA) to ₹3.25 (2 AAs)
- **Setup:** Free
- **Cert:** ₹30K
- **Special:** Free customization 6 months
- **Suggested:** Tier 2 (reliability focus)

### Dvara
- **Model:** Per fetch (use-case based)
- **Rates:**
  - Loan underwriting: ₹4.50/account
  - Loan monitoring: ₹3.25/fetch
  - Loan collections: ₹1.50/fetch
  - Employee monitoring: ₹4.50/fetch
  - Bank statement analytics: ₹7/account
- **Setup:** None
- **Cert:** ₹30K annual
- **Special:** Use-case pricing
- **Suggested:** Tier 3 (analytics user)

### Spark Capital
- **Model:** Per user/month
- **Rates:** ₹8 (includes TSP module)
- **Setup:** None
- **Cert:** ₹35K
- **Special:** TSP module included
- **Suggested:** Tier 4 (advanced features)

### Fibe (Portfos)
- **Model:** Hybrid (per fetch + minimum)
- **Rates:** ₹0.10/fetch, ₹2/user minimum
- **Setup:** ₹6,00,000
- **Cert:** ₹30K
- **Special:** 
  - 10% discount (max ₹50K) for 4 joint PRs/year
  - PFM solution with nudges
  - Customization: Free Year 1, then 20% of cost (not hourly)
- **Suggested:** Tier 4 (PFM analytics)

### PNB MetLife (NERV)
- **Model:** Per user/month (dual fee)
- **Rates:** ₹5 data + ₹499 console
- **Setup:** None
- **Cert:** Not specified
- **Special:** Employee monitoring
- **Suggested:** Tier 3 (analytics user)

---

## Appendix B: AA Market Data Sources

All pricing verified from official websites (November 2025):

**Setu AA:** setu-aa.com/pricing-policy
**Anumati:** anumati.co.in/pricing
**Finvu:** finvu.in/pricing
**NADL:** nadl.co.in/tariff
**Onemoney:** onemoney.in/pricing
**Protean:** proteansurakshaa.in/tariff
**CAMS:** Not publicly available

TSP pricing (Moneyone, Ignosis, Saafe): Not publicly available

---

*Last updated: November 20, 2025*
*Based on: 7 MSA analyses + 7 AA + 3 TSP market research*
