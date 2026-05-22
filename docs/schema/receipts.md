# Message Receipts

## Purpose

Tracks delivery and read state for messages.

## Source Of Truth Entity

```ts
type MessageReceiptStatus = "sent" | "delivered" | "seen";

type MessageReceipt = {
    messageId: string;

    userId: string;

    status: MessageReceiptStatus;

    updatedAt: string;
};
```

## Relationships

```mermaid
erDiagram

MESSAGE ||--o{ MESSAGE_RECEIPT : has
USER ||--o{ MESSAGE_RECEIPT : receives
```

## Aggregation Flow

```mermaid
flowchart LR

ReceiptRows[message_receipts]
Aggregation[aggregation layer]
MessageStatus[messages.status]
```

## Notes

-   message_receipts is the source of truth
-   messages.status stores simplified frontend state
-   frontend should not aggregate receipts manually
-   detailed receipt inspection can be loaded lazily
