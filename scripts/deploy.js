const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "checks the balance of your account")
.setAction(async function(taskArguments, hre){
    const account = getAccount();
    console.log(`Balance of ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys a contract")
.addParam("contract","Contract to deploy")
.setAction(async function(taskArguments, hre){
    const account = getAccount();
    const contractFactory = await hre.ethers.getContractFactory(taskArguments.contract, account);
    const deployedContract = await contractFactory.deploy("0x07AbFccEd19Aeb5148C284Cd39a9ff2Ac835960A","0x66408824A99FF61ae2e032E3c7a461DED1a6718E");
    console.log(`Contract deployed to: ${deployedContract.address}`);

});

//cartoken 0x66408824A99FF61ae2e032E3c7a461DED1a6718E
//carMarket 0x07AbFccEd19Aeb5148C284Cd39a9ff2Ac835960A
//carFactory 0x012f0c715725683A5405B596f4F55D4AD3046854