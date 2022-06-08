const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

//Helper method for fetching environment variable from .env
function getEnvVariable(Key, defaultValue) {
    if(process.env[Key]){
        return process.env[Key]
    }
    if(!defaultValue)
    {
        throw "No default value provided and Key is invalid"
    }
    return defaultValue;
}

//Helper method for fetching a connection provider to the Ethereum Network
function getProvider() {
   return ethers.getDefaultProvider(getEnvVariable("NETWORK", "rinkeby"), {
        alchemy: getEnvVariable('ALCHEMY_KEY')
    })
}

//Helper method for fetching a wallet account using an environment variable for the PK
function getAccount() {
    return new ethers.Wallet(getEnvVariable('PRIVATE_KEY'), getProvider());
}

//Helper method for fetching a contract instance at a given address
function getContract(contractName, hre){
    const account = getAccount();
    return getContractAt(hre, contractName, getEnvVariable("CONTRACT_ADDRESS"), account);
}

module.exports = {
    getEnvVariable,
    getProvider,
    getAccount,
    getContract
}