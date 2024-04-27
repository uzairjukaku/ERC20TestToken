const { expect } = require("chai");
const { ethers } = require("hardhat");

let myToken;
let accounts;

beforeEach(async () => {
  myToken = await ethers.deployContract("OceanCoin");
  accounts = await ethers.getSigners();
});

describe("deployment", async () => {
  it("Should have correct name and symbol", async () => {
    const name = await myToken.name();
    const symbol = await myToken.symbol();
    expect(name).to.equal("OceanCoin");
    expect(symbol).to.equal("OCC");
  });

  it("should have the correct total supply", async () => {
    const totalSupply = await myToken.totalSupply();
    expect(totalSupply).to.equal(ethers.parseEther("1000000000"));
  });
  it("should assign the initial supply to the deployer", async () => {
    const deployedBalance = await myToken.balanceOf(accounts[0].address);
    expect(deployedBalance).to.equal(ethers.parseEther("1000000000"));
  });
});

describe("Transfer and approve", async () => {
  it("should transfer token between accounts", async () => {
    const transferAmount = await ethers.parseEther("500000000");
    const transfered = await myToken.transfer(
      accounts[1].address,
      transferAmount
    );

    const senderBalance = await myToken.balanceOf(accounts[0].address);
    const reciversBalance = await myToken.balanceOf(accounts[1].address);
    expect(senderBalance).to.equal(await ethers.parseEther("500000000"));
    expect(reciversBalance).to.equal(await ethers.parseEther("500000000"));
  });

  it("should allow an owner to approve another account to spend their tokens", async () => {
    const owner = accounts[0];
    const spender = accounts[2];
    const approveAmount = await ethers.parseEther("500000000");
    await myToken.approve(spender, approveAmount);
    const allowance = await myToken.allowance(owner, spender);
    expect(allowance).to.equal(approveAmount);
  });
});
