# Socket Event Design

## Decision

Socket events use:

-   namespaced event naming
-   structured payload wrappers
-   domain-oriented semantics

## Event Naming

```text
message:new
message:update
message:delete

reaction:add
reaction:remove

receipt:update
```

## Why

Namespaced events:

-   scale cleanly
-   group related domains
-   improve readability
-   simplify mental models

## Payload Philosophy

Events transport:

-   domain entities
-   state changes

Not:

-   UI instructions

## Example

```ts
type MessageNewEvent = {
    message: Message;
};
```

## Notes

Events describe:

-   what happened

Not:

-   how frontend should behave

## Tradeoffs

### Pros

-   scalable event architecture
-   cleaner organization
-   easier debugging
-   easier future expansion

### Cons

-   slightly more verbose naming
