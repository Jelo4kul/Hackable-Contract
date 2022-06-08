const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const fetch = require("node-fetch");
const { ethers } = require("ethers");

task("priviledge-mint", "Mints CCY tokens to a specified address.")
.addParam("address", "The address to mint to.")
.addParam("amount", "The amount to mint.")
.setAction(async function(taskArguments, hre) {
    const contract = await getContract("CarToken", hre);
    const transactionResponse = await contract.priviledgedMint(taskArguments.address, taskArguments.amount,  {
        gasLimit: 500_000
    });
    console.log(`Transaction Hash:${transactionResponse.hash}`);
});
