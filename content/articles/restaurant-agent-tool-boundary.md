# The Restaurant Agent Shouldn't Invent the Bill

In my restaurant assistant prototype, I gave the model tools for reading the menu, creating orders, adding items, and checking the bill. The useful boundary is between a conversational request and an application action. The model can ask to add a coffee. The application has to decide what that means for the stored order.

## Make the tool result the source of truth

The prototype keeps a map of callable functions. The model produces an action containing a function name and input. The dispatcher looks up the function, executes it, and returns an observation to the conversation. The model then uses that observation to respond.

For order creation, my code looks up each requested item in the menu, separates valid from invalid items, computes the total, and saves an order record. The result contains both item lists. If a customer asks for a burger and something the restaurant doesn't sell, the response can explain the partial result instead of pretending the whole request succeeded.

The current menu prices a burger at $10.99 and coffee at $3.99, so adding them gives $14.98. That number comes from application data and arithmetic. I don't need a language model to rediscover addition during a phone call.

## JSON doesn't validate the action

My early dispatcher passes object values into positional function arguments:

```javascript
output = fn(...Object.values(parsed.input))
```

That's a fragile contract. JSON objects represent named fields, but the function expects an argument order. Swapping the property order can swap the arguments without making the JSON invalid.

For a more reliable version, I would validate each tool's input and explicitly select its named fields. Here's a proposed replacement for the `createOrder` branch, not code the prototype already ships:

```javascript
function dispatchCreateOrder(input) {
  if (
    !input ||
    typeof input.customerName !== 'string' ||
    !Array.isArray(input.items) ||
    input.items.length === 0 ||
    !input.items.every(item => typeof item === 'string')
  ) {
    return { ok: false, error: 'Invalid order input' }
  }
  return createOrder(input.customerName, input.items)
}
```

That catches shape errors at the boundary. Domain checks still belong inside the application: allowed status transitions, item availability, order ownership, and whether an empty order should ever be saved. My current prototype filters invalid items but can still create an empty order when every item is invalid.

## Retrying a mutation changes the problem

Reading a menu twice is harmless. Creating an order twice isn't. A network interruption can leave a caller unsure whether an action succeeded, even when the server already saved it.

The prototype creates IDs with `Date.now()` and writes JSON files. It doesn't provide durable idempotency or transactional updates. For a deployed version, I would assign a stable request key to each confirmed order action, persist it with the order under a uniqueness constraint, and return the existing result when that action is retried. That is a claim ticket: presenting it twice should retrieve the same order.

I would also store money in integer minor units and use transactional persistence for modifications. Rounding floating-point totals for display doesn't solve concurrent updates.

Voice adds another reason to be careful about mutations. A customer can interrupt or correct an item mid-sentence. I would keep draft order changes separate from confirmed submission, then speak the actual tool result. The next test I want is simple: interrupt, reconnect, and repeat a request while checking that only one intended order exists.

[Restaurant Voice and Ordering Agent in my portfolio](/projects#restaurant-voice-and-ordering-agent).
