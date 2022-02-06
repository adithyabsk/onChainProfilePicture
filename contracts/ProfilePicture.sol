// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

/// @title ProfilePictureNFT
/// @author Adithya Balaji

contract ProfilePicture is ERC721URIStorage {
    constructor() ERC721("ProfilePicture", "ProPic")
    {
        _safeMint(msg.sender, 0);
        _setTokenURI(0, formatTokenURI("abc"));
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            "adithya's pixel art profile picture",
                            '", "description":"Read my blog adithya.eth.link to find out how I built this.", "attributes":"", "image":"',imageURI,'"}'
                        )
                    )
                )
            )
        );
    }
}
