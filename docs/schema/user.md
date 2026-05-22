# User Schema

## Purpose

Represents an authenticated chat user.

## Entity

```ts
type User = {
    id: string;

    username: string;

    avatarUrl?: string;

    createdAt: string;
};
```

## Notes

-   users can participate in multiple chats
-   avatarUrl is optional
-   user presence is handled separately through sockets
