# Socket First Architecture

## Decision

Realtime socket events are treated as primary
state synchronization mechanism.

REST APIs are primarily used for:

-   initial loading
-   pagination
-   recovery flows

## Why

Chat applications are fundamentally realtime systems.

Sockets reduce:

-   polling
-   delayed synchronization
-   unnecessary requests

## Responsibilities

### REST

-   fetch messages
-   fetch chats
-   pagination
-   recovery

### Sockets

-   new messages
-   reactions
-   delivery updates
-   typing indicators
-   presence updates

## Tradeoffs

### Pros

-   realtime UX
-   lower latency
-   fewer requests

### Cons

-   reconnect complexity
-   synchronization edge cases
