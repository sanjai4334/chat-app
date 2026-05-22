# Frontend Optimized Payloads

## Decision

Backend returns frontend-ready payloads.

Frontend should not manually aggregate:

-   reactions
-   receipts
-   delivery states

## Why

Frontend aggregation creates:

-   duplicated logic
-   inconsistent rendering
-   unnecessary complexity

## Example

```ts
type MessageReactionSummary = {
    reaction: string;
    count: number;
    reacted: boolean;
};
```

## Notes

Viewer-specific state is computed on backend.

Examples:

-   reacted
-   liked
-   bookmarked
-   followed

## Tradeoffs

### Pros

-   simpler frontend
-   faster rendering
-   reduced client complexity

### Cons

-   more backend responsibility
