# Hybrid Normalization Strategy

## Decision

Use normalized tables as source of truth
while storing denormalized aggregates on messages.

## Normalized Tables

-   message_reactions
-   message_receipts
-   chat_members

## Denormalized Aggregates

Stored on messages:

-   reactions summary
-   simplified status

## Why

Pure normalization increases frontend complexity
and aggregation overhead.

Pure denormalization loses flexibility and correctness.

Hybrid architecture balances:

-   scalability
-   simplicity
-   developer experience

## Tradeoffs

### Pros

-   fast reads
-   flexible analytics
-   simpler frontend

### Cons

-   synchronization complexity
-   duplicate derived state
