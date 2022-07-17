# CommonMeta

Over time, people have needed to add more information to Krist transactions. Krist transactions have a `meta` field, 
however their contents are typically specific to each application. The CommonMeta specification aims to standardize 
common data in meta.

[[toc]]

## Overview

### Transaction to address
```
field1=value1;field2=value2;field3=value3
```

### Transaction to name
```
name.kst;field1=value1;field2=value2;field3=value3
```

### Transaction to metaname
```
meta@name.kst;field1=value1;field2=value2;field3=value3
```

Data is in the format `key=value`, separated by semicolons (`;`). There may be an unlimited amount of fields (but beware 
of the 255 char meta limit).

If a transaction is made to a name, the Krist server automatically prepends the name to the meta, and separates it from 
existing meta with a semicolon (`;`).

## Checking for names

If the transaction's `meta` field matches the regex `^(?:([a-z0-9-_]{1,32})@)?([a-z0-9]{1,64})\.kst`, then a name has 
been supplied. If meta has been provided to the transaction, then a semicolon (`;`) will follow the name, and then the 
rest of the meta. The meta may contain only a name, only meta, or a `name.kst;meta`. When parsing, the name should be 
added as an implicit field, `recipient`.

## Common fields

- `recipient` - (**implicit**) - The name the transaction was sent to, if it was sent to a name.
- `return` - Address or name to send KST back to.
- `donate` - (*boolean*) - Whether or not this transaction is a donation.
- `username` - Username of the sender of this transaction.
- `message` - Message to attach with this transaction.
- `error` - Error to attach with this transaction.
- `epoch` - The [Unix epoch time](https://en.wikipedia.org/wiki/Unix_time) of this transaction, or a related event.

## Parsers

Most Krist libraries, such as [k.lua](./libraries/k-lua.md) and [krist.js](./libraries/krist-js.md), have parsers for
CommonMeta built in. Refer to the library documentation for more information.
