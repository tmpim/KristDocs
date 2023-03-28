# Krist URI format

::: warning
The Krist URI format is currently a proposal. It will be used by the SwitchCraft
Minecraft server, but may be subject to change.

This is not a formal specification.
:::

The Krist URI format is **very loosely** based on 
[RFC 3986: Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986)
and may be used by applications to transmit identifiers referring to Krist
resources. 

Short identifiers (`tx`, `blk`, `addr`) are optionally allowed to allow users to 
type URIs quickly. Parsers MUST support both the long-form and short-form
identifiers.

All identifiers refer to resources located on the official Krist node currently
hosted at `krist.dev`.

### Resource identifiers

#### Addresses

```
krist://address/kre3w0i79j
krist://addr/kre3w0i79j
```

- Refers to the address kre3w0i79j. 
- Must be 10 characters of the form `[a-f0-9]{10}` (v1 address) or 
  `k[a-z0-9]{9}` (v2 address).
- Equivalent to the resource at the URL 
  [https://krist.dev/addresses/kre3w0i79j](https://krist.dev/addresses/kre3w0i79j)
- Can be viewed by users with a web browser at 
  [https://krist.club/network/addresses/kre3w0i79j](https://krist.club/network/addresses/kre3w0i79j)

#### Transactions

```
krist://transaction/1233456
krist://tx/1233456
```

- Refers to the transaction with ID 123456. 
- Must be an integer.
- Equivalent to the resource at the URL 
  [https://krist.dev/transactions/123456](https://krist.dev/transactions/123456)
- Can be viewed by users with a web browser at 
  [https://krist.club/network/transactions/123456](https://krist.club/network/transactions/123456)

#### Names

```
krist://name/example
krist://name/example.kst
krist://name/meta@example
krist://name/meta@example.kst
```

- Refers to the name `example.kst`.
- May contain a metaname. The `.kst` suffix is optional.
- Equivalent to the resource at the URL 
  [https://krist.dev/names/example](https://krist.dev/names/example)
- Can be viewed by users with a web browser at 
  [https://krist.club/network/names/example](https://krist.club/network/names/example)

