# Schema Overview

## Entity Relationships

```mermaid
erDiagram

CHAT ||--|| DM_CHAT : extends
CHAT ||--|| GROUP_CHAT : extends

CHAT ||--o{ MESSAGE : contains

DM_CHAT ||--o{ DM_MEMBER : contains
GROUP_CHAT ||--o{ GROUP_MEMBER : contains

USER ||--o{ DM_MEMBER : participates
USER ||--o{ GROUP_MEMBER : participates

MESSAGE ||--o{ MESSAGE_REACTION : contains
MESSAGE ||--o{ MESSAGE_RECEIPT : contains
```

## Notes

-   messages contain cached aggregate reaction summaries
-   reactions table is source of truth
-   receipts table is source of truth
-   messages are paginated newest -> oldest
-   frontend receives frontend-optimized payloads
