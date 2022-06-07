const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "checks the balance of your account")
.setAction(async function(taskArguments, hre){
    const account = getAccount();
    console.log(`Balance of ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys a contract")
.addParam("contract","Dontract to deploy")
.setAction(async function(taskArguments, hre){
    const account = getAccount();
    const contractFactory = await hre.ethers.getContractFactory(taskArguments.contract, account);
    const deployedContract = await contractFactory.deploy();
    console.log(`Contract deployed to: ${deployedContract.address}`);

});