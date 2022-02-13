# On Chain Profile Picture NFT

Mint a singular NFT that can be used as a digital avatar that is stored
completely on chain.

Versions:

- Solidity: 0.8.9
- Node: 16.10.0

## Steps

### Making the Image

- Generate a 24x24 vector image (use Photoshop, Illustrator, GIMP, etc...)
  - I personally used Photoshop, then rasterized and exported it from Illustrator
    - Note: you need to add `shape-rendering="crispEdges"` to svg tag for Illustrator exports
  - If you want to use just online tools:
    - Use a pixel art [editing tool like Piskelapp](https://www.piskelapp.com/)
      - You can import images and scale them down to 24x24 pixels
    - Then you need to convert the pixel art [PNG to SVG](https://codepen.io/shshaw/pen/XbxvNj)
- Manually optimize the export by layering the shapes [using this guide](https://codepen.io/shshaw/post/vector-pixels-svg-optimization-animation-and-understanding-path-data)
- Run an [SVG Compressor](https://vecta.io/) on the human optimization
  - Just running the compressor without manually optimizing the svg doesn't produce great
  results
  - My total optimization
    - 53x compression improvement or 98.1% reduction in characters
- Make sure all the quotes are double quotes
  - This is because we use a single quote for the solidity string

[//]: # (31795 chars --> 595 chars)
[//]: # (52419283 gas to 2188992 gas)

### Deploying the NFT

- Name the file `profile.svg` and replace the file in `assets/`
- Update the metadata in `profileAttributes.json`
  - This is specified by ERC721 and for more information [read the docs in OpenSea](https://docs.opensea.io/docs/metadata-standards)
- No go collect all the API keys you will need to run the deployment process
  - copy over `.env.sample` to `.env`
    - `ETHERSCAN_API_KEY`: this is to verify your contract on etherscan (so people can browse the sourcecode)
    - `MNEMONIC`: this is your private key mnemonic for your crypto address, DO NOT COMMIT THIS TO GITHUB (`.env` is
    ignored by default)
    - `*_RPC_URL`: these allow you to actually access the different blockchains. I use
    [Infura](https://docs.infura.io/infura), but you can use any RPC provider
    - `COINMARKETCAP_API_KEY`: this allows `hardhat-gas-reporter` to tell you the gas price of deploying your smart
    contract
- Now you run:

```shell
npm install
npm run build  # runs ./src/build.js (run --help for more info)
npx hardhat --network rinkeby deploy
```

- The first command generates `contracts/ProfileNFT.sol`, feel free to look at this source code
- Now go to [OpenSea Testnets](https://testnets.opensea.io/) to make sure the NFT looks right
- Now make sure you have enough gas in your `mainnet` wallet, and you can run:

```shell
npx hardhat --network mainnet deploy
```

## Some commands

```shell
npx hardhat accounts # The hardhat test chain accounts
npx hardhat compile  # Compiles the smart contracts in `/contracts/`
npx hardhat clean    # Cleans the generated artifacts from compile
npx hardhat test     # Run the test in `/test` (also gives you a gas fee estimate)
npx hardhat node     # Runs a local version of the hardhat chain
npx hardhat deploy   # Runs the deploy script in `/deploy`
npx hardhat help
```

## Some Light Reading

- [Flavours of On-chain SVG NFTs on Ethereum](https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum)
- Referenced Solidity Code
  - [OpenZeppelin](https://docs.openzeppelin.com/openzeppelin/)
    - [ERC721](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721) is the contract that defines how NFTs should
    work on Ethereum
    - [ERC721URIStorage](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721URIStorage) specifies how to
    store the URI of the asset itself (in this case an SVG) on Ethereum
- Another [SVG NFT implementation](https://github.com/PatrickAlphaC/all-on-chain-generated-nft)
- Some notes on [how Data URIs work](https://css-tricks.com/data-uris/)
- List of all valid [media type identifiers](https://www.iana.org/assignments/media-types/media-types.xhtml) for data
  URIs
- Why we don't [`base64` the svg](https://css-tricks.com/probably-dont-base64-svg/)
- Test the svg uri using [this DataURI to image converter](https://www.site24x7.com/tools/datauri-to-image.html)
- Test the JSON using [this JSON linter](https://jsonlint.com/)

## Future Work

- [ ] Add a frontend that lets users generate profile picture NFTs
