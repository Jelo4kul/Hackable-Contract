const { task } = require("hardhat/config");
const { getContract } = require("./helpers");

task("set-carfactory", "Sets the car factory after deployment.")
.addParam("address", "The address of the car factory.")
.setAction(async function(taskArguments, hre) {
    const contract = await getContract("CarMarket", hre);
    const transactionResponse = await contract.setCarFactory(taskArguments.address, {
        gasLimit: 500_000
    });
    console.log(`Transaction Hash:${transactionResponse.hash}`);
});
