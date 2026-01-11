require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
console.log("Loaded RPC:", process.env.SEPOLIA_RPC_URL);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
  },
};
