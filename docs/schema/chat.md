# Chat Schema

## Overview

Chats represent generic conversation containers.

The base chat table exists to provide:

-   unified conversation identity
-   shared message ownership
-   shared socket routing
-   shared pagination infrastructure

Business-specific behavior lives in specialized tables.

---

# Chat

```ts
type Chat = {
    id: string;

    type: "dm" | "group";

    createdAt: string;
};
```

## Notes

The base chat entity intentionally remains minimal.

It is used for:

-   message ownership
-   socket room identity
-   pagination
-   realtime synchronization

It is NOT responsible for:

-   membership semantics
-   DM metadata
-   group metadata

---

# DMChat

```ts
type DMChat = {
    chatId: string;

    /**
     * deterministic sorted participant key
     *
     * example:
     * u1:u2
     */
    dmKey: string;
};
```

## Notes

DM chats maintain separate metadata because
DMs have significantly simpler lifecycle semantics
than groups.

The dmKey exists only to:

-   prevent duplicate DMs
-   guarantee deterministic uniqueness

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

DM memberships intentionally remain lightweight.

DMs only track:

-   participation
-   block state

DMs do not currently require:

-   roles
-   invites
-   moderation lifecycle
-   ownership semantics

---

# Future Group Architecture

Groups are intentionally deferred for later design.

Groups are expected to evolve into significantly richer domains with:

-   roles
-   moderation
-   invites
-   ownership
-   permissions
-   audit history
