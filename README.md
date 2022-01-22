# On Chain Profile Picture NFT

Mint a singular NFT that can be used as a digital avatar that is stored
completely on chain.

Versions:

- Solidity: 0.8.9
- Node: 16.10.0

## Steps

- Generate a 24x24 vector
- Add the crispEdges feature to the Illustrator export
- Run an [SVG Compressor](https://vecta.io/) on the output
- Convert all the double quotes to single quotes

### Some commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

### TODO

- [ ] Add a CLI utility that base64 encodes SVGs
- [ ] Convert the contract to a template file
  - [ ] Add a CLI function that inserts the base64 string into the contract
- [ ] Set up the hardhat deployment process
- [ ] Set up hardhat to automate the process of deploying the contract


## Some Light Reading

- [Flavours of On-chain SVG NFTs on Ethereum](https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum)
- Referenced Solidity Code
  - [OpenZeppelin](https://docs.openzeppelin.com/openzeppelin/)
    - [ERC721](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721) is the contract that defines how NFTs should
    work on Ethereum
    - [ERC721URIStorage](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721URIStorage) specifies how to
    store the URI of the asset itself (in this case an SVG) on Ethereum
  - [Base64](https://github.com/Brechtpd/base64) is a solidity implementation of base64 encoding and decoding

## Future Work

- Add a frontend that lets users generate profile picture NFTs
- Add a way to allow users to add frames to their NFTs
