/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");



module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY],
      
    },
  },
};
