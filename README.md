# What is Event Ingestion?

When you have a Metered Feature in Flexprice (such as API calls, storage usage, or credits consumed), you need to inform Flexprice when and how much your customers are utilizing that feature. This is accomplished by transmitting events - JSON payloads that describe usage activity.

## How It Works

1. **[Create a Metered Feature](https://docs.flexprice.io/docs/event-ingestion/creating-a-metered-feature)** - Define what you want to track (e.g., "model.usage", "api.calls")
2. **[Send Events](https://docs.flexprice.io/docs/event-ingestion/sending-events)** - Your application transmits usage data to Flexprice via API
3. **[Validate Events](https://docs.flexprice.io/docs/event-ingestion/sending-events)** - Verify that events are being processed correctly
4. **[Connect to Billing](https://docs.flexprice.io/docs/event-ingestion/connecting-to-billing)** - Link the feature to a pricing plan and customer subscription
5. **Automatic Invoicing** - Flexprice calculates charges and generates invoices

## Key Concepts

### Event

A JSON payload containing usage information:
- **Who** used the feature (`external_customer_id`)
- **What** feature was used (`event_name`)
- **How much** was used (`properties`)
- **When** it happened (`timestamp`)

The Event Name is the unique identifier that connects your events to this feature:
- Must be unique across all features in your account
- Cannot be changed after creation
- Must match exactly what you send in your events
- Use lowercase with dots (e.g., model.usage,data.fetch)


### Aggregation

How Flexprice combines multiple events into a single quantity for billing (see [Aggregation Overview](https://docs.flexprice.io/docs/event-ingestion/aggregation) for detailed explanations):

- **Count** - Number of events
- **Sum** - Total of a numeric property
- **Average** - Mean value of a numeric property
- **Count Unique** - Number of distinct values
- **Latest** - Most recent value
- **Sum with Multiplier** - Sum with rate conversion
- **Max** - Highest value seen (supports bucketing)
- **Weighted Sum** - Time-weighted sum for capacity billing

Property Values :

- Numbers: Use for Sum, Max aggregations
```bash
"properties": { "credits": 2 }
```

- Strings: Use for Unique Count, Latest aggregations
```bash
"properties": { "user_id": "user_123" }
```

### Usage Reset

How usage accumulates over time:

- **Periodic** - Resets each billing cycle (e.g., monthly API calls)
- **Cumulative** - Keeps growing (e.g., total storage used)

## Debugging Checklist
Before diving into specific issues, run through this checklist:
- Feature exists and is active
- Event Name matches exactly (case-sensitive)
- External Customer ID exists in Flexprice
- API key is valid and has proper permissions
- Events are being transmitted to the correct endpoint
- Required fields are present in event payload
- Aggregation field exists in event properties (if required)
- Customer has an active subscription with the feature


## Plan vs Feature
Feature means what is being billed
Plan means how much is being billed per Feature.