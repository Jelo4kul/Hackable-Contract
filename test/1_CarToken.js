const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require("web3");
const web3 = new Web3();
use(solidity);


describe("Car Token contract",  () => {
  let owner, address1, address2, address3, contractFactory, carContract;
  const MAX_SUPPLY = web3.utils.toWei("200100", "Ether").toString();
  const DEFAULT_MINT_VALUE = web3.utils.toWei("1", "Ether").toString();

  before(async () => {
    [owner, address1, address2, address3] = await ethers.getSigners();
  });

  before(async () => {
    contractFactory = await ethers.getContractFactory("CarToken", owner);
  });

  before(async () => {
    carToken = await contractFactory.deploy();
  });


  //*************************************
  //      CONSTRUCTOR TESTS
  //*************************************

  describe("constructor", () => {
    describe("when deployed", () => {
      it("should have right owner", async () => {
        expect(await carToken.owner()).to.deep.equal(owner.address);
      });

      it("should have the correct name and symbol", async () => {
        expect(await carToken.name()).to.deep.equal("Car Company");
        expect(await carToken.symbol()).to.deep.equal("CCY");
      });
    })
  });

  //*************************************
  //      MINT TESTS
  //*************************************
  describe("mint", () => {
    describe("when called", () => {
      it("should update the user's balance", async () => {
        await carToken.connect(address1).mint();
        expect(await carToken.balanceOf(address1.address)).to.be.equal(DEFAULT_MINT_VALUE);
      });

      it("should revert if user has already minted", async () => {
        await expect(carToken.connect(address1).mint()).to.be.revertedWith("Can only mint once");
      });

      it("should mint only if max supply hasn't been reached", async () => {
        await carToken.connect(address2).mint();
        expect(await carToken.totalSupply()).to.be.lte(MAX_SUPPLY);
      });
    });
    
  });

  describe("priviledgedMint", () => {
    describe("when called by public", () => {
      it("should revert", async () => {
        await expect(carToken.connect(address1).priviledgedMint(address3.address, MAX_SUPPLY))
        .to.be.revertedWith("Ownable: caller is not the owner");
      });
    });

    describe("when called by owner", () => {
      it("should mint tokens to specified address", async () => {
        await carToken.priviledgedMint(address3.address, web3.utils.toWei("1", "Ether"));
        expect(await carToken.balanceOf(address3.address)).to.be.equal(DEFAULT_MINT_VALUE);
      });
    })
  });
});