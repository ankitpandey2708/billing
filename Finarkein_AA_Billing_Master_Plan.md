# Finarkein Billing Strategy

## Summary

We analyzed 7 Account Aggregators and 3 tech providers. Here's our pricing strategy.

**Key points:**
- AA costs: ₹0.01 to ₹30 per fetch
- Our TSP fee: ₹5 to ₹50 per fetch (based on features)
- AA charges passed through at cost
- 5 pricing tiers for different client needs

---

## Market Pricing

### Account Aggregators (Licensed)

| Provider | Price Range | Model | Notes |
|----------|-------------|-------|-------|
| Setu AA | ₹0.01 - ₹25 | Use-case | Varies by FIU type |
| Anumati | ₹1 - ₹25 | Data-type | ₹1 profile, ₹5-25 statements |
| Finvu | ₹20 - ₹30 | Volume | Discounts available |
| NADL | ₹2 | Flat | Includes all steps |
| Onemoney | ₹0.30 - ₹11 | Per-account | ₹0.30 balance, ₹11 all data |
| Protean | ₹2 - ₹10 | Per-fetch | Varies by date range |
| CAMS | Not public | Volume | Contact for pricing |

### Tech Providers (Not Licensed)

| Provider | Pricing | Status |
|----------|---------|--------|
| Moneyone | Not public | TSP platform |
| Ignosis | Not public | TSP platform |
| Saafe | Not public | TSP platform |

**What this means:**
- AA costs are the "toll road" fee
- We add value on top with our tech
- Our competitors don't publish TSP pricing

---

## Two Types of Costs

### 1. AA Charges (Pass-Through)

**What it is:** Fee from licensed aggregators
**Who pays:** Client (at actual cost)
**Our role:** We pass it through, no markup
**Range:** ₹0.01 to ₹30 per fetch

### 2. TSP Fees (Our Revenue)

**What it is:** Fee for our platform and features
**Who pays:** Client (our service charge)
**Our role:** This is how we make money
**Range:** ₹5 to ₹50 per fetch (based on tier)

**Total client cost = TSP fee + AA charge**

---

## Why We're Better

### What We Offer

**Multi-AA Access:**
- We connect to 12 AAs (8 deep integrations)
- Competitors: 5-6 AAs max
- Result: Better coverage, less downtime

**Smart Routing:**
- Health-based routing across AAs
- Auto-retry on failures
- Less than 30% traffic to any single AA
- Result: 99%+ uptime

**More Data Types:**
- 10 financial instrument types
- Competitors: 1-5 types
- Result: Complete financial picture

**Built-In Analytics:**
- Income verification (salaried + gig)
- Spend analysis
- Portfolio tracking
- Cross-analysis (bank + GST, bank + investments)
- Result: Ready-to-use insights

### What Competitors Lack

**Moneyone:**
- Single AA routing only
- No analytics
- No auto-retry
- Good for: Basic use cases only

**Ignosis:**
- 6 AAs (vs our 12)
- No auto-fetch
- No retry scheduler
- High concentration risk (85%+ on one AA)

**Our advantage:** Enterprise-grade reliability + analytics

---

## Our Pricing Tiers

### Tier 1: Basic (₹5-₹8 per fetch)

**Who it's for:** Small clients, simple needs

**What's included:**
- Single AA routing
- Basic API access
- Email support

**Total cost:** ₹5-8 (our fee) + AA charge

### Tier 2: Reliable (₹10-₹15 per fetch)

**Who it's for:** Mid-size clients who need uptime

**What's included:**
- Multi-AA routing
- Health-based switching
- Auto-fetch
- Auto-retry
- Standard support

**Total cost:** ₹10-15 (our fee) + AA charge

### Tier 3: Analytics (₹20-₹30 per fetch)

**Who it's for:** Lenders, underwriters

**What's included:**
- Everything in Tier 2
- Bank statement analysis
- Income verification
- Spend categorization
- Cashflow analysis

**Total cost:** ₹20-30 (our fee) + AA charge

### Tier 4: Advanced (₹35-₹50 per fetch)

**Who it's for:** Large FIUs with complex needs

**What's included:**
- Everything in Tier 3
- Portfolio analysis
- GST cross-analysis
- Fraud detection
- Custom analytics

**Total cost:** ₹35-50 (our fee) + AA charge

### Tier 5: Enterprise (Custom)

**Who it's for:** Banks, large NBFCs

**What's included:**
- Platform license
- Custom workflows
- Dedicated support
- SLA guarantees
- White-label options

**Pricing:** Platform fee + per-fetch fee + AA charge

---

## Volume Discounts

| Monthly Fetches | Discount |
|-----------------|----------|
| 10K - 50K | 10% off |
| 50K - 100K | 15% off |
| 100K - 500K | 20% off |
| 500K+ | 30% off |

**Example:**
- Base price: ₹15/fetch
- Volume: 60K fetches/month
- Discount: 15%
- Final price: ₹12.75/fetch

---

## Competitive Comparison

### Feature Matrix

| Feature | Finarkein | Ignosis | Moneyone |
|---------|-----------|---------|----------|
| **AAs Connected** | 12 | 6 | 5 |
| **Multi-AA Routing** | Yes | Maybe | No |
| **Auto-Retry** | Yes | No | No |
| **Auto-Fetch** | Yes | No | No |
| **Income Analysis** | Yes | Yes | No |
| **Portfolio Analysis** | Yes | Yes | No |
| **Cross-Analysis** | Yes | No | No |
| **Concentration Risk** | <30% | >85% | >90% |

### What This Means

**For basic needs:** All providers work
**For reliability:** Only we guarantee uptime
**For analytics:** We're the only complete solution

---

## Implementation Plan

### Month 1-2: Foundation

**Build:**
- Per-fetch tracking system
- Tier-based billing logic
- AA cost pass-through tracking

**Launch:**
- Tier 1 and Tier 2 pricing
- Basic volume discounts

### Month 3-4: Analytics

**Build:**
- Module-wise usage tracking
- Analytics feature flags
- Add-on billing system

**Launch:**
- Tier 3 pricing
- Analytics add-ons

### Month 5-6: Enterprise

**Build:**
- Platform fee structures
- SLA credit system
- Custom pricing engine

**Launch:**
- Tier 4 and Tier 5 pricing
- Enterprise contracts

---

## Pricing Examples

### Example 1: Small Lender (Tier 2)

**Profile:**
- 5K fetches/month
- Needs reliability
- Basic underwriting

**Costs:**
- TSP fee: ₹12/fetch × 5K = ₹60,000
- AA charges: ₹5/fetch × 5K = ₹25,000
- Total: ₹85,000/month

### Example 2: Mid-Size NBFC (Tier 3)

**Profile:**
- 50K fetches/month
- Needs analytics
- Income verification

**Costs:**
- TSP fee: ₹25/fetch × 50K = ₹12,50,000
- Volume discount: 10% = -₹1,25,000
- Net TSP: ₹11,25,000
- AA charges: ₹5/fetch × 50K = ₹2,50,000
- Total: ₹13,75,000/month

### Example 3: Large Bank (Tier 5)

**Profile:**
- 500K fetches/month
- Custom workflows
- Dedicated support

**Costs:**
- Platform fee: ₹5,00,000/month
- TSP fee: ₹15/fetch × 500K = ₹75,00,000
- Volume discount: 30% = -₹22,50,000
- Net TSP: ₹52,50,000
- AA charges: ₹3/fetch × 500K = ₹15,00,000
- Total: ₹72,50,000/month

---

## Migration Strategy

### For Existing Clients

**Step 1: Audit current usage**
- Track fetches per month
- Identify features used
- Calculate current costs

**Step 2: Map to tiers**
- Match features to tier
- Calculate new pricing
- Show value gained

**Step 3: Transition**
- Grandfather pricing for 3 months
- Phase in new tiers
- Offer upgrade incentives

### For New Clients

**Step 1: Discovery**
- Understand use case
- Estimate volume
- Identify must-have features

**Step 2: Recommend tier**
- Match needs to tier
- Show cost breakdown
- Explain value

**Step 3: Onboard**
- Start with lower tier
- Monitor usage
- Upgrade as needed

---

## Sales Positioning

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

---

## Key Metrics to Track

### Revenue Metrics
- Average revenue per fetch
- Revenue by tier
- Volume discount impact
- AA cost vs TSP revenue ratio

### Usage Metrics
- Fetches per client per month
- Tier distribution
- Feature adoption rate
- Upgrade/downgrade rate

### Operational Metrics
- AA cost per fetch (actual)
- Gross margin by tier
- Support cost by tier
- Infrastructure cost per fetch

---

## Competitive Responses

### "Your competitor is cheaper"

**Response:**
"Let's compare total cost of ownership. Our multi-AA routing means 99%+ uptime. What's the cost of downtime for your business?"

### "Why should I pay for analytics?"

**Response:**
"You're already paying for raw data. We turn it into decisions. Our income verification alone saves 2-3 hours per application."

### "I only need one AA"

**Response:**
"That's fine. Start with Tier 1 at ₹5-8 per fetch. When you need reliability, upgrade to Tier 2."

### "Can you match their price?"

**Response:**
"We can't match on price alone. But we can show you the value difference. Let's run a pilot and measure the impact."

---

## Action Items

### This Month
- [ ] Finalize tier pricing
- [ ] Build billing system
- [ ] Create pricing calculator
- [ ] Train sales team

### Next Quarter
- [ ] Launch Tier 1-3
- [ ] Migrate 10 pilot clients
- [ ] Measure gross margins
- [ ] Refine pricing based on data

### Next 6 Months
- [ ] Launch Tier 4-5
- [ ] Automate volume discounts
- [ ] Build self-service pricing
- [ ] Expand to 50+ clients

---

## Appendix: Source Verification

All AA pricing verified from official websites (Nov 2025):

**Setu AA:** setu-aa.com/pricing-policy
**Anumati:** anumati.co.in/pricing
**Finvu:** finvu.in/pricing
**NADL:** nadl.co.in/tariff
**Onemoney:** onemoney.in/pricing
**Protean:** proteansurakshaa.in/tariff

TSP pricing not publicly available (verified via browser check).

---

*Last updated: November 20, 2025*
