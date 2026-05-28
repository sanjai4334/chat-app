# Authenticated Socket Context

## Decision

Authenticated user identity is attached
to internal socket context after JWT verification.

## Example

```ts
socket.user = {
    id: "u1",
};
```

## Why

Clients should never send:

-   senderId
-   authenticated identity

Sender identity must be derived from:

-   verified JWT
-   authenticated socket context

## Notes

-   socket.user exists only on server
-   client cannot access socket.user
-   socket.id represents connection identity
-   socket.user.id represents authenticated user identity

## Security Benefits

Prevents:

-   sender spoofing
-   forged identities
-   client impersonation

## Tradeoffs

### Pros

-   secure identity derivation
-   cleaner event payloads
-   centralized authentication context

### Cons

-   authenticated socket lifecycle complexity
