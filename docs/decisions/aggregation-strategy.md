# Aggregation Strategy

## Decision

Messages store cached aggregate summaries for:

-   reactions
-   simplified status state

while normalized tables remain the source of truth.

## Why

Avoid expensive aggregation queries during chat rendering.

Frontend should receive frontend-ready payloads.

## Example

```ts
type Message = {
    reactions: {
        reaction: string;
        count: number;
        reacted: boolean;
    }[];

    status: "sending" | "sent" | "delivered" | "seen";
};
```

## Source Of Truth

-   message_reactions
-   message_receipts

## Tradeoffs

### Pros

-   faster reads
-   simpler frontend
-   simpler socket updates
-   reduced aggregation overhead

### Cons

-   slightly more expensive writes
-   aggregate synchronization complexity

## Future Improvements

-   Redis caching
-   background aggregation workers
-   materialized views
