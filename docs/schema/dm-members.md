# DM Member Schema

## Overview

DM memberships are intentionally lightweight.

DMs have significantly simpler lifecycle semantics
than groups.

---

# DMMember

```ts
type DMMember = {
    chatId: string;

    userId: string;

    blocked: boolean;
};
```

## Notes

DM memberships only track:

-   participation
-   block state

DMs do not require:

-   roles
-   invites
-   bans
-   moderation lifecycle
