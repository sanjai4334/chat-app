# Client Generated Message IDs

## Decision

Message IDs are generated on clients before emission.

ULIDs are preferred.

## Why

Client-generated IDs allow:

-   optimistic rendering
-   stable reconciliation
-   retry support
-   offline queue support

## Flow

```text
client generates id
↓
optimistic render
↓
emit message:new
↓
persist same id
```

## Notes

-   no temporary IDs required
-   no server-side ID replacement required
-   optimistic message becomes persisted message

## ULID Benefits

-   sortable
-   globally unique
-   append-friendly ordering
-   cursor-friendly

## Tradeoffs

### Pros

-   simpler optimistic updates
-   stable identity
-   cleaner reconciliation

### Cons

-   client responsible for ID generation
