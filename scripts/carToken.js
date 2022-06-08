const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const fetch = require("node-fetch");
const { ethers } = require("ethers");

task("priviledge-mint", "Sets the car factory after deployment.")
.addParam("address", "The address of the car factory.")
.addParam("amount", "The amount.")
.setAction(async function(taskArguments, hre) {
    const contract = await getContract("CarToken", hre);
    const transactionResponse = await contract.priviledgedMint(taskArguments.address, taskArguments.amount,  {
        gasLimit: 500_000
    });
    console.log(`Transaction Hash:${transactionResponse.hash}`);
});
