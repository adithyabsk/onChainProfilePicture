const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Should mint NFT", function () {
    it("Should mint an NFT", async function () {
        const NFT = await ethers.getContractFactory("ProfileNFT");
        const nft = await NFT.deploy();
        await nft.deployed();
        // const [_, minter] = await ethers.getSigners()
        //
        // await nft.connect(minter).mint()
    });
});
