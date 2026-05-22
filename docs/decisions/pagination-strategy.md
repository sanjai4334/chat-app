# Pagination Strategy

## Decision

Messages are paginated newest -> oldest using cursor pagination.

## Why

Offset pagination becomes expensive at scale.

Chat applications naturally load recent messages first.

## Strategy

```text
latest messages
↓
scroll upward
↓
load older messages
```

## Query Pattern

```sql
SELECT *
FROM messages
WHERE chat_id = ?
AND created_at < cursor
ORDER BY created_at DESC
LIMIT 20
```

## Tradeoffs

### Pros

-   scalable
-   stable pagination
-   efficient indexes

### Cons

-   slightly more complex frontend logic

## Notes

Frontend stores messages in chronological order
after receiving paginated batches.
