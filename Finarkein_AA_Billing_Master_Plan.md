# Finarkein AA Billing Master Plan & Competitive Analysis

## Executive Summary

This master document consolidates the competitive pricing analysis of the Account Aggregator (AA) landscape and outlines a comprehensive billing strategy for Finarkein. It leverages Finarkein's unique position as a multi-AA orchestrator with superior analytics capabilities to define a value-based pricing model.

---

## Part 1: Competitive Pricing Analysis

### Overview of AA & TSP Pricing Models

We analyzed the pricing structures of Account Aggregators (AAs) and Technology Service Providers (TSPs) to establish a baseline for Finarkein's cost structure and competitive positioning.

| Provider | Entity Type | Pricing Model | Price Range (per fetch) | Key Notes |
|----------|-------------|---------------|-------------------------|-----------|
| **Setu AA** | **AA** (Agya Technologies) | Use-case based | ₹0.01 - ₹25 | RBI-licensed NBFC-AA. Pricing depends on FIU use case. |
| **Anumati** | **AA** (Perfios) | Data-type based | ₹1 - ₹25 | RBI-licensed NBFC-AA. ₹5-25 for statements, ₹1 for profile/summary. |
| **Finvu** | **AA** (Cookiejar Tech) | Volume-based | ₹20 - ₹30 | RBI-licensed NBFC-AA. Volume discounts available. |
| **NADL** | **AA** (NESL) | Transaction-based | ₹2 | RBI-licensed NBFC-AA. ₹2/transaction includes onboarding, discovery, consent. |
| **Moneyone** | **TSP** (Tech Platform) | Hybrid (Per-account + Rev Share) | ₹0.30 - ₹60 | Technology Service Provider. ₹0.30-₹60/account + 10-30 bps revenue share for insights. |
| **Onemoney** | **AA** (FinSec AA) | Hybrid (Per-account + Rev Share) | ₹1 - ₹60 | RBI-licensed NBFC-AA. ₹1-₹60/account + 10-30 bps revenue share. |
| **Protean** | **AA** (NSDL) | Per-fetch | Undisclosed | RBI-licensed NBFC-AA. Per-fetch transaction basis. Free for consumers. |
| **CAMS** | **AA** (CAMSFinServ) | Undisclosed | - | RBI-licensed NBFC-AA. Free for consumers. B2B pricing not disclosed. |
| **Ignosis** | **TSP** (FIP/FIU Module) | Pay-as-you-go | Custom | Technology Service Provider. Multi-AA routing, enterprise custom pricing. |
| **Saafe** | **TSP** (FIP/FIU Module) | Modular | Custom | Technology Service Provider. Multi-AA gateway, modular platform. |

### Key Insights
1.  **Entity Types**: **7 Account Aggregators** (RBI-licensed NBFC-AA) vs **3 TSPs** (Technology platforms) in our analysis.
2.  **Wide Variance**: AA costs range from ₹0.01 to ₹60, heavily influenced by volume, use case, and data type.
3.  **Pass-Through Model**: Most AAs pass through FIP charges (if any) to the FIU.
4.  **Volume Discounts**: Standard for high-volume commitments across all AAs.
5.  **TSP Positioning**: TSPs like Ignosis and Saafe offer multi-AA orchestration (similar to Finarkein) with custom enterprise pricing.

---

## Part 2: The Distinction: AA vs. TSP Pricing

It is critical to distinguish between the two cost components in the ecosystem:

### 1. Account Aggregator (AA) Charges
*   **Role**: The "Data Pipe". Licensed NBFC-AA entity.
*   **Charge For**: Successful data fetch/consent.
*   **Nature**: Regulated, often commoditized, "toll-road" fee.
*   **Billing**: Often passed through by the TSP to the client (FIU) at actuals.

### 2. Technology Service Provider (TSP) Charges (Finarkein)
*   **Role**: The "Intelligence Layer". Technology partner.
*   **Charge For**: Orchestration, Analytics, Reliability, Support, Integrations.
*   **Nature**: Value-based, unregulated, SaaS fee.
*   **Billing**: Service fee charged by Finarkein for enabling and enhancing the AA ecosystem.

> **Finarkein's Model**: We charge a **TSP Service Fee** for our platform value. AA charges are treated as **Pass-Through Costs** (at actuals).

---

## Part 3: Finarkein's Competitive Advantage (TSP Layer)

Finarkein is not just a connector; it is a comprehensive **Technology Service Provider (TSP)** with distinct advantages over standalone AAs.

### Core Differentiators
*   **Multi-AA Orchestration**: Integration with **12 AAs** (8 deep integrations) vs. 1-6 for competitors.
*   **Reliability**: **<30% concentration** with any single AA, ensuring high availability via health-based routing.
*   **Data Depth**: Support for **10 FI types** (vs. 1-5 standard).
*   **Advanced Analytics**: Built-in underwriting, monitoring, and cross-analysis (Bank-Investment, Bank-GST).
*   **Enterprise Ready**: LMS/CRM integrations, white-label PFM, and dedicated support.

---

## Part 4: Finarkein Billing Strategy (TSP Fees)

### Pricing Philosophy
**Separation of Concerns**:
*   **TSP Fee**: For Finarkein's technology, orchestration, and analytics.
*   **AA Cost**: Pass-through at actuals (transparent to client).

### Recommended TSP Service Fee Tiers
*(These fees are **in addition** to the underlying AA charges)*

#### **Tier 1: Basic Connectivity (TSP Fee: ₹5 - ₹8 / fetch)**
*   **Target**: Small FIUs needing basic connectivity.
*   **Includes**: Single AA routing, Basic API access.
*   **Total Cost to Client**: TSP Fee (₹5-8) + AA Charge (at actuals).

#### **Tier 2: Orchestration & Reliability (TSP Fee: ₹10 - ₹15 / fetch)**
*   **Target**: Mid-sized FIUs prioritizing uptime.
*   **Includes**: **Multi-AA Orchestration**, Health-based routing, Auto-fetch/Retry.
*   **Total Cost to Client**: TSP Fee (₹10-15) + AA Charge (at actuals).

#### **Tier 3: Analytics & Intelligence (TSP Fee: ₹20 - ₹30 / fetch)**
*   **Target**: Lenders and Underwriters.
*   **Includes**: Tier 2 + **Analyzed Data** (Bank statement analysis, Income verification).
*   **Total Cost to Client**: TSP Fee (₹20-30) + AA Charge (at actuals).

#### **Tier 4: Premium Analytics Suite (TSP Fee: ₹35 - ₹50 / fetch)**
*   **Target**: Large FIUs with complex needs.
*   **Includes**: Tier 3 + **Advanced Analytics** (Portfolio, GST cross-analysis, Fraud detection).
*   **Total Cost to Client**: TSP Fee (₹35-50) + AA Charge (at actuals).

#### **Tier 5: Enterprise Solutions (Custom)**
*   **Target**: Banks, Large NBFCs.
*   **Includes**: Platform license, Custom flows, Dedicated support.
*   **Pricing**: Platform Fee + Per-fetch TSP Fee + AA Charge (at actuals).

### Volume Discounts
| Monthly Fetches | Discount |
|-----------------|----------|
| 10k - 50k | 10% |
| 50k - 100k | 15% |
| 100k - 500k | 20% |
| 500k+ | 30% |

---

## Part 4: Implementation Roadmap

### Phase 1: Foundation (Months 1-2)
*   Implement per-fetch tracking and tier-based billing logic.
*   Track AA pass-through costs to monitor gross margins.

### Phase 2: Intelligence (Months 3-4)
*   Deploy module-wise usage tracking for analytics.
*   Launch "Add-on" billing for specific analytics modules.

### Phase 3: Enterprise & Scale (Months 5-6)
*   Roll out platform fee structures and SLA credit systems.
*   Automate volume discount calculations.

---

## Conclusion
By bundling multi-AA reliability and advanced analytics into tiered offerings, Finarkein can command a premium over raw data providers while offering superior value to FIUs.

*Prepared for Finarkein Analytics | November 2025*
