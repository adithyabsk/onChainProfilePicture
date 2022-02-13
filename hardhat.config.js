require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers"); // not really required since it is already required by waffle
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require("hardhat-gas-reporter");

require('dotenv').config()

// https://stackoverflow.com/a/68329516/3262054
function getEnv(name) {
  let val = process.env[name];
  if ((val === undefined) || (val === null)) {
    throw ("missing env var for " + name);
  }
  return val;
}

const MNEMONIC = getEnv("MNEMONIC");
const RINKEBY_RPC_URL = getEnv("RINKEBY_RPC_URL");
const MAINNET_RPC_URL = getEnv("MAINNET_RPC_URL");
const POLYGON_RPC_URL = getEnv("POLYGON_RPC_URL");
const ETHERSCAN_API_KEY = getEnv("ETHERSCAN_API_KEY");
const COINMARKETCAP_API_KEY = getEnv("COINMARKETCAP_API_KEY");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    localhost: {},
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC
      },
      saveDeployments: true,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC
      },
      saveDeployments: true,
    },
    polygon: {
      url: POLYGON_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
  },
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  // https://github.com/wighawag/hardhat-deploy#configuration
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0
    },
    feeCollector: {
      default: 1
    }
  },
  //
  gasReporter: {
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        // we only have a single run which is the deployment
        runs: 1,
      }
    }
  },
};
