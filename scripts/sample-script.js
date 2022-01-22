const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const ProfilePicture = await hre.ethers.getContractFactory("ProfilePicture");
  const proppic = await ProfilePicture.deploy();

  await proppic.deployed();

  console.log("Greeter deployed to:", proppic.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
