# Socket Authentication

## Overview

Socket connections are authenticated using JWTs.

Authentication happens during socket connection,
before realtime events are processed.

---

# Goals

-   identify authenticated users
-   prevent sender spoofing
-   derive sender identity securely
-   maintain trusted realtime connections

---

# Architecture Overview

```mermaid
sequenceDiagram

participant Client
participant AuthAPI
participant SocketServer
participant DB

Note over Client,AuthAPI: LOGIN FLOW

Client->>AuthAPI: email + otp

AuthAPI->>DB: verify otp

DB-->>AuthAPI: valid user

AuthAPI-->>Client: signed JWT


Note over Client,SocketServer: SOCKET CONNECTION FLOW

Client->>SocketServer: connect + JWT

SocketServer->>SocketServer: verify JWT signature

SocketServer->>SocketServer: check expiry

SocketServer->>SocketServer: decode user payload

SocketServer->>SocketServer: attach user to socket

Note right of SocketServer: socket.user = { id: "u1" }

SocketServer->>SocketServer: store active connection

Note right of SocketServer: userSocketMap u1 -> [socket-123]

SocketServer-->>Client: authenticated connection established


Note over Client,SocketServer: MESSAGE FLOW

Client->>SocketServer: message:new

Note right of Client: payload contains: id, chatId, content

SocketServer->>SocketServer: read socket.user.id

Note right of SocketServer: senderId derived from authenticated socket

SocketServer->>DB: persist message

Note right of SocketServer: id, chatId, senderId, content, createdAt

DB-->>SocketServer: persisted message

SocketServer-->>Other Clients: message:new
```

---

# JWT Verification

Socket authentication uses JWT verification.

Server verifies:

-   token signature
-   token expiry
-   token validity

## Notes

-   JWT is signed by backend
-   backend owns verification secret
-   client cannot forge valid tokens

---

# Authenticated Socket Context

After verification, server attaches authenticated user
to the internal socket object.

```ts
socket.user = {
    id: "u1",
};
```

## Important

`socket.user` exists ONLY on server.

Client cannot:

-   access it
-   modify it
-   spoof it

---

# Socket Identity vs User Identity

## socket.id

Represents:

-   realtime connection
-   browser tab
-   active device

One user can have multiple socket IDs.

---

## socket.user.id

Represents:

-   authenticated user identity

Used for:

-   senderId derivation
-   authorization
-   permissions

---

# Active Connection Tracking

Server maintains active realtime connections.

Example:

```ts
Map<userId, socketIds[]>;
```

Example:

```ts
{
  "u1": [
    "socket-a",
    "socket-b"
  ]
}
```

## Notes

Used for:

-   multi-device sync
-   presence
-   targeted broadcasting
-   disconnect tracking

Not used as authentication source.

---

# Security Notes

Clients never send:

-   senderId
-   authenticated identity

Sender identity is always derived from:

-   verified JWT
-   authenticated socket context

This prevents:

-   identity spoofing
-   sender impersonation
-   forged events

---

# Future Improvements

-   refresh token flow
-   reconnect authentication
-   token rotation
-   role-based permissions
-   device/session management
