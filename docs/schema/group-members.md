# Group Member Schema

## Overview

Group memberships maintain richer lifecycle
and moderation semantics.

Groups support:

-   roles
-   moderation
-   invites
-   membership history

---

# GroupMember

```ts
type GroupMember = {
    chatId: string;

    userId: string;

    role: "owner" | "admin" | "member";

    status: "active" | "left" | "removed" | "banned" | "invited";

    joinedAt: string;

    leftAt?: string;
};
```

## Notes

Membership rows are preserved historically.

Users are not removed from the table when leaving.

This allows:

-   membership history
-   moderation auditing
-   rejoin tracking
-   past participant visibility
