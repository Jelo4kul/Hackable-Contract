const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers } = require("hardhat");
const Web3 = require("web3");
const web3 = new Web3();
use(solidity);

describe("Car Factory contract", () => {
    let owner, address1, cfContractFactory, carFactory, carMarket, marketContractFactory, carToken, tokenContractFactory;
    const AMT_TO_BORROW = web3.utils.toWei("1", "Ether").toString();
    const DEFAULT_CAR_COST = web3.utils.toWei("1", "Ether").toString();

    before(async () => {
        [owner, address1] = await ethers.getSigners();
    });

    before(async () => {
        tokenContractFactory = await ethers.getContractFactory("CarToken", owner);
        marketContractFactory = await ethers.getContractFactory("CarMarket", owner);
        cfContractFactory = await ethers.getContractFactory("CarFactory", owner);
    });

    before(async () => {
        carToken = await tokenContractFactory.deploy();
        carMarket = await marketContractFactory.deploy(carToken.address);
        carFactory = await cfContractFactory.deploy(carMarket.address, carToken.address);

    });

    describe("constructor", () => {
        describe("when deployed", () => {
            it("should set the address of CarMarket and CarToken", async () => {
                expect(await carFactory.getCarMarket()).to.be.equal(carMarket.address);
                expect(await carFactory.getCarToken()).to.be.equal(carToken.address);
            });
        });
    });

    describe("flashLoan", () => {
        describe("when called", () => {
            it("should revert if the borrower is not an existing customer", async () => {
                await expect(carFactory.connect(address1).flashLoan(AMT_TO_BORROW)).to.be.revertedWith("Not existing customer");
            });

            it("should revert if amount to borrow is greater than amount to loan", async () => {
                await carToken.connect(address1).mint();
                await carToken.connect(address1).approve(carMarket.address, DEFAULT_CAR_COST);
                await carMarket.connect(address1).purchaseCar("Red", "Camry", "23KLNVAB");
                await expect(carFactory.connect(address1).flashLoan(AMT_TO_BORROW)).to.be.revertedWith("Amount not available");
            });
        });
    });
});
