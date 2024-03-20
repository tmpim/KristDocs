# k.lua

The recommended Krist API for Lua is [k.lua](https://github.com/tmpim/k.lua) by [tmpim](https://github.com/tmpim). This 
API makes use of [r.lua](https://github.com/tmpim/r.lua), [w.lua](https://github.com/tmpim/w.lua) and 
[Jua](https://github.com/tmpim/Jua) to make the Krist API a breeze to interact with. You will also need the 
[JSON API by ElvishJerricco](http://www.computercraft.info/forums2/index.php?/topic/5854-json-api-v201-for-computercraft/) 
to create and parse the JSON objects required by the Krist API.

[[toc]]

## Quick start

### Installing k.lua and dependencies
There is a simple script to download + install k.lua and all its dependencies. It can be used in one of two ways - with 
`wget` (**recommended**, CC: Tweaked 1.84 and higher), or Pastebin (old ComputerCraft versions):

#### wget (**recommended**, CC: Tweaked 1.84 and higher)
```
wget run https://raw.githubusercontent.com/tmpim/k.lua/master/kstrap.lua
```

#### Pastebin (old ComputerCraft versions)
```
pastebin run 4ddNhMYd
```

### Initialization
First, make sure you have required all the dependencies for k.lua:

```lua
local w = require("w") -- allows interaction with krist websocket api (for realtime data)
local r = require("r") -- makes http requests easier
local k = require("k") -- the krist api itself
local jua = require("jua") -- makes events easier
os.loadAPI("json.lua") -- to parse data returned by the krist api
local await = jua.await

-- initialise w.lua, r.lua and k.lua
r.init(jua)
w.init(jua)
k.init(jua, json, w, r)
```

## Understanding Jua
Jua is a callback system for ComputerCraft, inspired by JavaScript callbacks. It gets rid of the usual event loop, and 
replaces it with `jua.on("event", callback)`. For example:

```lua
local jua = require("jua")

jua.on("key", function(event, key)
  -- this code is called every time there is a `key` event
  print("Key pressed: " .. keys.getName(key))
end)

jua.on("terminate", function()
  -- this event is required to ensure we can actually close our program
  jua.stop()
  printError("Terminated")
end)

jua.go(function()
  -- jua is ready, and you can run all your code in here
  print("Jua is ready.")
end)
```

## Making requests to the Krist API
### Supported API calls
K.lua currently supports the following API calls:

- [`address(address)`](https://github.com/tmpim/k.lua/blob/master/k.lua#L48) ([api docs](https://krist.dev/docs/#api-AddressGroup-GetAddress)) - Gets information about an address, such as its balance
- [`addressTransactions(address, limit, offset)`](https://github.com/tmpim/k.lua/blob/master/k.lua#L55) ([api docs](https://krist.dev/docs/#api-AddressGroup-GetAddressTransactions)) - Gets recent transactions by an address
- [`addressNames(address)`](https://github.com/tmpim/k.lua/blob/master/k.lua#61) ([api docs](https://krist.dev/docs/#api-AddressGroup-GetAddressNames)) - Gets names owned by an address
- [`addresses(limit, offset)`](https://github.com/tmpim/k.lua/blob/master/k.lua#67) ([api docs](https://krist.dev/docs/#api-AddressGroup-GetAddresses)) - List all addresses
- [`rich(limit, offset)`](https://github.com/tmpim/k.lua/blob/master/k.lua#73) ([api docs](https://krist.dev/docs/#api-AddressGroup-GetRichAddresses)) - List the addresses with the highest balance
- [`transactions(limit, offset)`](https://github.com/tmpim/k.lua/blob/master/k.lua#79) ([api docs](https://krist.dev/docs/#api-TransactionGroup-GetTransactions)) - List all transactions
- [`latestTransactions(limit, offset)`](https://github.com/tmpim/k.lua/blob/master/k.lua#85) ([api docs](https://krist.dev/docs/#api-TransactionGroup-GetLatestTransactions)) - List all recent transactions
- [`transaction(transactionID)`](https://github.com/tmpim/k.lua/blob/master/k.lua#91) ([api docs](https://krist.dev/docs/#api-TransactionGroup-GetTransaction)) - Get information about a single transaction
- [`makeTransaction(privatekey, to, amount, metadata)`](https://github.com/tmpim/k.lua/blob/master/k.lua#97) ([api docs](https://krist.dev/docs/#api-TransactionGroup-MakeTransaction)) - Make a transaction

### Making a request
To make a request, you need to `await()` the API call, for example:

```lua
-- success is true if the request went ok, false if not
-- address contains information about the address
local success, address = await(k.address, "khugepoopy")
assert(success, "Failed to get address.")

print("Address: " .. address.address)
print("Balance: " .. address.balance)
```

This code should go inside the `jua.go` call.

::: warning
**Make sure you don't forget to `await`!** If you don't await when using k.lua functions, 
you must pass a callback, or else you will get an error.
:::

### Using websockets
K.lua also supports websockets. These allow you to receive event data from the Krist node in realtime.

::: warning
**Make sure your privatekey is in the correct format.** If you don't convert the privatekey 
to the correct privatekey format, you may authenticate as the wrong address. You can read more about wallet privatekey 
formats [here](../wallet-formats.md).
:::

```lua
local function openWebsocket()
  local success, ws = await(k.connect, "your-private-key")
  assert(success, "Failed to get websocket URL")

  print("Connected to websocket.")

  -- here we subscribe to the 'transactions' event
  local success = await(ws.subscribe, "transactions", function(data)
    -- this function is called every time a transaction is made
    local transaction = data.transaction

    print("Transaction made:")
    print("From: " .. transaction.from)
    print("To: " .. transaction.to)
    print("Value: " .. transaction.value .. " KST")
    -- Transactions have other properties, including "metadata", "id" and "time".
    -- Metadata can be parsed using k.parseMeta
  end)
  assert(success, "Failed to subscribe to event")
end

jua.go(function()
  openWebsocket()
  -- your other code
end)
```

Available events can be found in the 
[Krist API documentation](https://krist.dev/docs/#api-WebsocketGroup-WebsocketStart). These can be subscribed to 
as transactions are in the example above. Multiple events can be subscribed to at once. It may also be useful to connect
some sort of indicator to the `keepalive` event if `k.lua` is being used in ComputerCraft, so that it is easy to tell 
whether a computer is functioning or not.
