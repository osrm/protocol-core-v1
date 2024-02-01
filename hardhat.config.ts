import "@nomicfoundation/hardhat-foundry"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "@nomicfoundation/hardhat-verify"
import "@tenderly/hardhat-tenderly"
import * as tdly from "@tenderly/hardhat-tenderly" // also import tdly for setup, in addition to global import above
import "@typechain/hardhat"
// import "@openzeppelin/hardhat-upgrades"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "hardhat-deploy"
import { HardhatConfig, HardhatUserConfig } from "hardhat/types"
import "hardhat-contract-sizer" // npx hardhat size-contracts

require("dotenv").config()

tdly.setup({
  automaticVerifications: true,
})

//
// NOTE:
// To load the correct .env, you must run this at the root folder (where hardhat.config is located)
//
const MAINNET_URL = process.env.MAINNET_URL || "https://eth-mainnet"
const MAINNET_PRIVATEKEY = process.env.MAINNET_PRIVATEKEY || "0xkey"
const GOERLI_URL = process.env.GOERLI_URL || "https://eth-goerli"
const GOERLI_PRIVATEKEY = process.env.GOERLI_PRIVATEKEY || "0xkey"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  defaultNetwork: "tenderly",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
    },
    tenderly: {
      url: MAINNET_URL || "",
      chainId: 1,
      accounts: [MAINNET_PRIVATEKEY],
    },
    goerli: {
      chainId: 5,
      url: GOERLI_URL || "",
      accounts: [GOERLI_PRIVATEKEY],
    },
  },
  // @ts-ignore
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 20_000,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT_SLUG || "",
    username: process.env.TENDERLY_USERNAME || "",
    forkNetwork: 1, // fork mainnet
    privateVerification: process.env.TENDERLY_PRIVATE_VERIFICATION === "true",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
}

export default config