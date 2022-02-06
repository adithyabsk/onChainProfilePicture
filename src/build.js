#!/usr/bin/env node

const path = require("path");
const fs = require('fs');

const tokenURIJSONTemplate = imageBase64 => `{
    "name": "adithya's pixel art profile picture",
    "description": "Read my blog adithya.eth.link to find out how I built this.",
    "attributes": "",
    "image": "${imageBase64}", 
}`;
const tokenURITemplate = tokenURIBase64 => `data:application/json;base64,${tokenURIBase64}`;
const nftContractTemplate = tokenURI => `// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title ProfileNFT
/// @author Adithya Balaji

contract ProfileNFT is ERC721URIStorage {
    constructor() ERC721("ProfileNFT", "PNFT")
    {
        _safeMint(msg.sender, 0);
        _setTokenURI(0, "${tokenURI}");
    }
}
`;

const args = process.argv.slice(2);
const assetPath = args[0] || path.join(__dirname, "../assets/profile.svg");
const outputPath = args[1] || path.join(__dirname, "../contracts/ProfileNFT.sol");

function generateNFTFromAsset() {
    // create smart contract template
    const svgFile = fs.readFileSync(assetPath);
    const svgBase64 = svgFile.toString('base64');
    const tokenURIJSON = tokenURIJSONTemplate(svgBase64);
    const tokenURIJSONBase64 = Buffer.from(tokenURIJSON).toString('base64');
    const tokenURI = tokenURITemplate(tokenURIJSONBase64);
    const contract = nftContractTemplate(tokenURI);

    // write contract to disk
    fs.writeFile(outputPath, contract, err => {});
}

generateNFTFromAsset();
