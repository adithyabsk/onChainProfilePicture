#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');
const path = require("path");
const fs = require('fs');

const symbols = /[\r\n%#()<>?[\\\]^"`{|}]/g;

// we don't need to encode spaces or single quotes
// https://css-tricks.com/probably-dont-base64-svg/#aa-update-optimized-url-encoded
// https://github.com/yoksel/url-encoder/blob/a3924f05b358eb73bd60312e6f9422340f0495c4/src/js/script.js#L133
function encodeSVG(data) {
    // Use single quotes instead of double to avoid encoding.
    data = data.replace(/>\s{1,}</g, `><`);
    data = data.replace(/\s{2,}/g, ` `);
    return data.replace(symbols, encodeURIComponent);
}

const imageURITemplate = encodedSVG => `data:image/svg+xml,${encodedSVG}`;
const getTokenJSON = (tokenMetadataPath, imageURI) => {
    const jsonMetadata = JSON.parse(fs.readFileSync(tokenMetadataPath));
    jsonMetadata["image"] = imageURI;
    return JSON.stringify(jsonMetadata, null);
}
// const tokenJSONTemplate = imageBase64 => `{"name":"pixel art profile picture of adithya","description":"Read my blog adithya.eth.link to find out how I built this.","attributes":"","image":"${imageBase64}"}`;
const tokenURITemplate = tokenJSON => `data:application/json;base64,${tokenJSON}`;
const nftContractTemplate = tokenURI => `// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title ProfileNFT
/// @author Adithya Balaji

contract ProfileNFT is ERC721URIStorage {
    constructor() ERC721("ProfileNFT", "PNFT")
    {
        // we don't need to use _safeMint since we are minting in the constructor
        _mint(msg.sender, 0);
        _setTokenURI(0, '${tokenURI}');
    }
}
`;

// `hideBin` is shorthand for `process.argv.slice(2)`
const argv = yargs(hideBin(process.argv))
    .command('$0', 'build the solidity nft contract', (ygs) => {
        ygs.positional('assetPath', {
            describe: 'the path to the svg asset',
            default: path.join(__dirname, "../assets/profile.svg"),
            type: 'string'
        })
        ygs.positional('metadataPath', {
            describe: 'the path to the json metadata for the nft',
            default: path.join(__dirname, "../assets/profileAttributes.json"),
            type: 'string'
        })
        ygs.positional('outputPath', {
            describe: 'the output path for the nft smart contract',
            default: path.join(__dirname, "../contracts/ProfileNFT.sol"),
            type: 'string'
        })
    })
    .count('verbose')
    .alias('v', 'verbose')
    .argv

VERBOSE_LEVEL = argv.verbose;
function WARN()  { VERBOSE_LEVEL >= 0 && console.log.apply(console, arguments); }
function INFO()  { VERBOSE_LEVEL >= 1 && console.log.apply(console, arguments); }
function DEBUG() { VERBOSE_LEVEL >= 2 && console.log.apply(console, arguments); }

// Create smart contract template
function generateNFTFromAsset(assetPath, metadataPath, outputPath) {
    // Get svg data uri
    const svgFile = fs.readFileSync(assetPath);
    const encodedSVG = encodeSVG(svgFile.toString());
    const svgURI = imageURITemplate(encodedSVG);
    INFO("Test this DataURI by pasting it into a converter:")
    INFO(svgURI);

    // Get json data uri
    const tokenJSON = getTokenJSON(metadataPath, svgURI);
    console.log(tokenJSON);
    // note: It seems to be more space efficient to base64 encode the json data since URI component encode uses more
    //       characters.
    // const encodedJSON = encodeURIComponent(tokenJSON);
    const encodedJSON = Buffer.from(tokenJSON).toString('base64');
    const tokenURI = tokenURITemplate(encodedJSON);
    INFO("Validate this JSON data URI in a json linter:")
    INFO(tokenURI);

    // Write contract to disk
    const contract = nftContractTemplate(tokenURI);
    fs.writeFile(outputPath, contract, err => {});
}

generateNFTFromAsset(argv.assetPath, argv.metadataPath, argv.outputPath);
