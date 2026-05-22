# Schema Overview

## Entity Relationships

```mermaid
erDiagram

USER ||--o{ CHAT_MEMBER : joins
CHAT ||--o{ CHAT_MEMBER : contains

CHAT ||--o{ MESSAGE : has
USER ||--o{ MESSAGE : sends

MESSAGE ||--o{ MESSAGE_REACTION : has
USER ||--o{ MESSAGE_REACTION : reacts

MESSAGE ||--o{ MESSAGE_RECEIPT : has
USER ||--o{ MESSAGE_RECEIPT : receives
```

## Notes

-   messages contain cached aggregate reaction summaries
-   reactions table is source of truth
-   receipts table is source of truth
-   messages are paginated newest -> oldest
-   frontend receives frontend-optimized payloads
