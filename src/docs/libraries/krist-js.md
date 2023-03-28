# krist.js

JavaScript and TypeScript wrapper for the [Krist API](https://krist.dev/docs).
Supports Node.js and the browser.

#### Useful links
- [GitHub](https://github.com/tmpim/krist.js)
- [npm](https://npmjs.com/package/krist)
- [Full API reference](https://docs.krist.dev/library/krist.js/modules/)

#### Table of contents
[[toc]]

## Features
- Works on the server with Node.js, and in browsers
- Modern, Promise-based API with TypeScript support designed with async/wait in mind
- Type-safe functions for all HTTP endpoints
- Fully-featured WebSocket client with events and automatic reconnection
- Useful Promise exceptions for all API errors
- V2 Address generation with support for common wallet formats (KristWallet, Krist API, etc.)
- CommonMeta parser for transaction metadata
- Pagination helper for working with multiple pages of results
- Utilities for common tasks such as validating addresses and names

### Not yet supported
- Lookup API
- Search API
- Idempotent requests

## Quick start

1. Install `krist` from npm or yarn:

```sh
npm install krist
yarn add krist
```

2. Import `krist` and create an instance of `KristApi`:

```ts
import { KristApi } from "krist";
const api = new KristApi();
```

View the [full API reference here](https://docs.krist.dev/library/krist.js/modules/).

## Making HTTP requests

The `KristApi` has Promise-based wrapper methods for almost all Krist API
endpoints.

#### Example
```ts
import { KristApi } from "krist";
const api = new KristApi();

// Newer versions of Node.js support top-level await, but for older versions and
// the browser you will need an `async` function to use async/await.
async function main() {
  // Fetch details for the `kqxhx5yn9v` address
  const address = await api.getAddress("kqxhx5yn9v");
  console.log(`My balance is: ${address.balance}`);
}

main().catch(console.error);
```

### Supported methods
The full list of supported endpoints, with documentation on parameters and
return types, can be seen in the 
[full API reference](https://docs.krist.dev/library/krist.js/classes/KristApi.html).

- [`checkNameAvailability(name)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#checkNameAvailability)
- [`getAddress(address, [fetchNames])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getAddress)
- [`getAddressNames(address, [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getAddressNames)
- [`getAddressTransactions(address, [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getAddressTransactions)
- [`getAddresses([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getAddresses)
- [`getName(name)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getName)
- [`getNameBonus()`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getNameBonus)
- [`getNameCost()`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getNameCost)
- [`getNames([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getNames)
- [`getNewNames([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getNewNames)
- [`getRichAddresses([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getRichAddresses)
- [`getTransaction(id)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getTransaction)
- [`getTransactions([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#getTransactions)
- [`login([options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#login)
- [`makeTransaction(to, amount, [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#makeTransaction)
- [`motd()`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#motd)
- [`paginateAddressNames(address, [options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateAddressNames)
- [`paginateAddressTransactions(address, [options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateAddressTransactions)
- [`paginateAddresses([options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateAddresses)
- [`paginateNames([options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateNames)
- [`paginateNewNames([options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateNewNames)
- [`paginateRichAddresses([options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateRichAddresses)
- [`paginateTransactions([options], onPageFn)`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#paginateTransactions)
- [`registerName(name, [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#registerName)
- [`supply()`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#supply)
- [`transferName(name, newOwner, [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#transferName)
- [`updateName(name, [data], [options])`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#updateName)

## Paginated results

For all endpoints that return a large amount of data, the API returns a 
paginated result. The library provides functions to make collecting these
results easier.

Each list endpoint (`e.g. getAddresses`) has a corresponding paginate function
(e.g. `paginateAddresses`). The paginate function takes an `options` object
containing the initial options (`limit`, the results per page, and `offset`,
the offset of the first page) and `onPageFn`, a callback function that will be
called for each page collected.

`onPageFn` will be called multiple times with the following arguments:
- `results` - An array of results for the current page
- `total` - The total amount of results for the whole collection

If the `onPageFn` callback returns `false`, pagination will stop.

#### Example
```ts
await api.paginateAddresses({}, (results, total) => {
  console.log(`There are ${total} addresses in total.`);
  console.log(results);
});

console.log("Pagination has finished.");
```

## Making transactions

Authenticated endpoints such as 
[`login`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#login), 
[`makeTransaction`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#makeTransaction), 
[`registerName`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#registerName),
[`transferName`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#transferName) and 
[`updateName`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#updateName)
require a password or private key to be
specified. Krist.js supports all common [wallet formats](../wallet-formats.md),
so private keys can be automatically derived from a password by simply providing
the password.

Therefore, authentication options can be supplied in two ways:

#### Wallet format password authentication (recommended)
```json5
{
  password: "your kristwallet password",
  /* Optional, defaults to `kristwallet` */ 
  // format: "kristwallet"
}
```

#### Raw privatekey authentication (NOT recommended)
```json5
{
  // Not recommended
  privatekey: "RAW PRIVATEKEY"
}
```

Valid wallet formats understood by krist.js are:

- `"kristwallet"` - (default) The [kristwallet](../wallet-formats.md#kristwallet-format) format.
- `"kristwallet_username_appendhashes"` - The legacy [kristwallet_username](../wallet-formats.md#kristwallet-username-format) format. The `username` field is required alongside `password`.
- `"kristwallet_username"` - The legacy [kristwallet_username](../wallet-formats.md#kristwallet-username-format) format. The `username` field is required alongside `password`.
- `"api"` - The raw API private key - the password is passed as-is.

#### Examples
```ts
// Regular transaction to "kexample01"
const transaction = await api.makeTransaction("kexample01", 500, {
  password: "your kristwallet password"
});

// Transaction to "lemmmy@switchcraft.kst"
const transaction = await api.makeTransaction("lemmmy@switchcraft.pw", 500, {
  password: "your kristwallet password"
});

// Transaction with metadata
const transaction = await api.makeTransaction("kexample01", 500, {
  password: "your kristwallet password",
  metadata: "message=Here is your refund."
});
```

## Websocket client (realtime events)

Krist.js has a fully featured Krist websocket client built in. Call the
[`createWsClient`](https://docs.krist.dev/library/krist.js/classes/KristApi.html#createWsClient) 
function to get a 
[`KristWsClient`](https://docs.krist.dev/library/krist.js/classes/KristWsClient.html)
instance, register any event listeners, and call `ws.connect();` to open the
connection to the server. After this, Krist.js will handle automatically
reconnecting if the websocket gets disconnected.

An `initialSubscriptions` array can be passed to the `createWsClient` function's
options, containing a list of subscription types to subscribe to. The following
subscription types are supported:

| Subscription name | Event         | Description                                                                               |
| ----------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `transactions`    | `transaction` | Transaction events whenever a transaction is made by anybody on the node.                 |
| `ownTransactions` | `transaction` | Transaction events whenever a transaction is made to or from the authed user.             |
| `names`           | `name`        | Name events whenever a name is purchased, modified or transferred by anybody on the node. |
| `ownNames`        | `name`        | Name events whenever the authed user purchases, modifies or transfers a name.             |

#### Example
```ts
import { KristApi } from "krist";
const api = new KristApi();

// Create a new websocket client. Subscribe to all transaction events
const ws = api.createWsClient({
  initialSubscriptions: ["transactions"]
});

// Set up the event listeners before connecting
ws.on("transaction", async ({ transaction }) => {
  console.log("New transaction received:", transaction);
});

ws.on("ready", async () => {
  // Connected! Requests can now be made to the websocket server:
  const me = await ws.getMe();
  console.log("Websocket client now ready! I am:", me);
});

ws.connect(); // Connect to the websocket server
```

## Parsing CommonMeta

Krist.js features a full [CommonMeta](../commonmeta.md) parser for transaction
metadata. The
[`parseCommonMeta`](https://docs.krist.dev/library/krist.js/functions/parseCommonMeta.html)
function returns an
[object](https://docs.krist.dev/library/krist.js/interfaces/CommonMeta.html)
containing all the parsed fields, including the recommended "implicit" field
`recipient`. It also parses names into separate "metaname" and "name"
components. 

### CommonMeta object format

The
[CommonMeta](https://docs.krist.dev/library/krist.js/interfaces/CommonMeta.html)
object returned may contain any of the following optional fields:

```json5
{
  // The full name of the recipient of the transaction, see CommonMeta docs for
  // detailed explanation
  "recipient": "iron@shop.kst",
  "name": "shop.kst",
  "metaname": "iron",

  "return": "Lemmmy@switchcraft.kst",
  // The presence of `returnRecipient` means the `return` field was parsed as a 
  // valid name:
  "returnRecipient": "Lemmmy@switchcraft.kst",
  "returnName": "switchcraft.kst",
  "returnMetaname": "Lemmmy",

  // All other fields will be passed as-is:
  "message": "...",
  "custom1": "...",
  "custom2": "...",
  // ...
}
```

#### Examples

Parses CommonMeta for incoming transactions, verifies the recipient address, and
logs the metaname. Make sure to import `parseCommonMeta`:
```ts{1,2,13-23}
// Import parseCommonMeta from krist.js
import { KristApi, parseCommonMeta } from "krist";
const api = new KristApi();

const ws = api.createWsClient({
  initialSubscriptions: ["transactions"]
});

ws.on("transaction", async ({ transaction }) => {
  // Make sure to verify the transaction is sent TO your address, otherwise
  // the transactions may be "spoofed":
  if (transaction.type === "transfer" && transaction.to === "kblockdest") {
    const meta = parseCommonMeta(transaction.metadata);

    // If no metadata was parsed or it did not contain a metaname, ignore the
    // transaction completely:
    if (!meta?.metaname) return; 

    // Filter out transactions that weren't to this specific shop, too:
    if (meta.name !== "blockdepot.kst") return;

    // Now, transactions sent to `iron@blockdepot.kst` will print a message:
    console.log(`Received ${transaction.value} KST for ${meta.metaname}`);
    // => Received 1 KST for iron
  }
});

ws.on("ready", async () => {
  console.log("Shop is now ready!");
});

ws.connect();
```

## Use in the browser

Krist.js supports the Browser as well as Node.js. If you are using a bundler
like Webpack or Rollup, you can simply import and use the `"krist"` package the
same way as you would in Node.js. However, if you are not using any bundlers or
build tools, the library will be available under global variable called `krist`:

```html
<script src="node_modules/krist/lib/browser.js"></script>
<script>
  const api = new krist.KristApi();  
</script>
```
