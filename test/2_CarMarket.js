const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers } = require("hardhat");
const Web3 = require("web3");
const web3 = new Web3();
use(solidity);

describe("Car Market Contract", () => {
    let owner, address1, tokenContractFactory, marketContractFactory, carMarket, carToken;
    const DEFAULT_CAR_COST = web3.utils.toWei("1", "Ether").toString();

    before(async () => {
        [owner, address1] = await ethers.getSigners();
    });

    before(async () => {
        tokenContractFactory = await ethers.getContractFactory("CarToken", owner);
        marketContractFactory = await ethers.getContractFactory("CarMarket", owner);
    });

    before(async () => {
        carToken = await tokenContractFactory.deploy();
        carMarket = await marketContractFactory.deploy(carToken.address);
   
    });

    //*************************************
    //      CONSTRUCTOR
    //*************************************
    describe("constructor", () => {
        describe("when deployed", () => {
            it("should set the address of car token", async () => {
               expect(await carMarket.getCarToken()).to.be.equal(carToken.address);
            });
        })
    });

    describe("setCarfactory", () => {
        describe("when called by public", () => {
            it("should revert", async () => {
                await expect(carMarket.connect(address1).setCarFactory(owner.address))
                .to.be.revertedWith("Ownable: caller is not the owner");
            });
        });

        describe("when called by owner", () => {
            it("should set the address of the car factory", async () => {
                await carMarket.setCarFactory(address1.address);
                expect(await carMarket.getCarFactory()).to.be.equal(address1.address);
            });
        });
    });

    describe("purchaseCar", () => {
       describe("when called", () => {
           it("should purchase car", async () => {
                await carToken.mint();
                await carToken.approve(carMarket.address, DEFAULT_CAR_COST);
                await carMarket.purchaseCar("Red", "Camry", "23KLNVAB");
                expect(await carMarket.getCarCount(owner.address)).to.be.equal(1);
           });

           it("should revert if buyer doesn't have enough money for the car", async () => {
                await expect(carMarket.purchaseCar("Red", "Camry", "23KLNVAB")).to.be.revertedWith("Not enough money");
           });
       });
    });
});
