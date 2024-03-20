# Wallet privatekey formats

Wallets often apply transformations to the raw privatekey to prevent the original text being exposed to malicious third 
parties. While this does not protect the address's balance, it does protect the address's owner from password reuse 
attacks. The most common wallet format used is the [Kristwallet Format](#kristwallet-format).

[[toc]]

## kristwallet Format
This format is the most common format. It is most notably used by [kristwallet](https://github.com/BTCTaras/kristwallet), 
[KWallet](https://github.com/apemanzilla/KWallet), 
[Smallet](http://www.computercraft.info/forums2/index.php?/topic/27105-smallet-lightweight-basic-computer-compatible-wallet-for-krist/) 
and [KristWeb](https://krist.club).

It applies the following transformations:

- Prepend `KRISTWALLET` to the privatekey
- Hash the whole string with sha256
- Append `-000`

#### k.lua
If you are using [k.lua](libraries/k-lua.md), you can use `k.toKristWalletFormat(privatekey)`.

#### Plain lua
This requires a [sha256 API](http://www.computercraft.info/forums2/index.php?/topic/8169-sha-256-in-pure-lua/). 
Example code to perform these operations would look like this:

```lua
sha256("KRISTWALLET" .. privatekey) .. "-000"
```

## API Format
This format is usually used by programs. It applies **no transformations** to the privatekey - it just sends the plain 
privatekey to the Krist node.

## kristwallet_username Format
This is a legacy format originally implemented in [kristwallet_username](https://github.com/KristFoundation/kristwallet_username). 
It requires both a privatekey and a username. It is implemented in [KristWeb](https://kristweb.lemmmy.pw), 
and [kristwallet_username](https://github.com/KristFoundation/kristwallet_username). 

It applies the following transformations:

- Prepend `KRISTWALLETEXTENSION` to the pre-appendhashes algorithm
- Hash the whole string with sha256
- Append `-000`;

#### Plain lua
This requires a [sha256 API](http://www.computercraft.info/forums2/index.php?/topic/8169-sha-256-in-pure-lua/). Example 
code to perform these operations would look like this:

```lua
sha256("KRISTWALLETEXTENSION" .. sha256(sha256(username) .. "^" .. sha256(privatekey))) .. "-000"
```

## jwalelset format
This is a format implemented by jwalelset and [KristWeb](https://kristweb.lemmmy.pw).

It applies the following transformations:

- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256
- Hash the whole string with sha256

#### Plain lua
This requires a [sha256 API](http://www.computercraft.info/forums2/index.php?/topic/8169-sha-256-in-pure-lua/). Example 
code to perform these operations would look like this:

```lua
sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(sha256(privatekey))))))))))))))))))
```
