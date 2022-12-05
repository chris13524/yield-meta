import { expect } from "chai";
import { ethers } from "hardhat";

const ZERO = ethers.utils.parseEther("0");
const ONE = ethers.utils.parseEther("1");
const TWO = ethers.utils.parseEther("2");

describe("YieldMeta", () => {
  it("Should have no initial balances", async () => {
    const Contract = await ethers.getContractFactory("YieldMeta");
    const contract = await Contract.deploy();
    expect(await contract.getBalance().value).to.equal(undefined);
  });

  it("Should accept deposits", async () => {
    const Contract = await ethers.getContractFactory("YieldMeta");
    const contract = await Contract.deploy();
    await contract.deposit({ value: ONE });
    expect(await contract.getBalance()).to.equal(ONE);
  });

  it("Should support withdrawls", async () => {
    const Contract = await ethers.getContractFactory("YieldMeta");
    const contract = await Contract.deploy();
    await contract.deposit({ value: TWO });
    await contract.withdraw(ONE);
    expect(await contract.getBalance()).to.equal(ONE);
  });

  it("Should reject withdrawls when balance is not sufficient", async () => {
    const Contract = await ethers.getContractFactory("YieldMeta");
    const contract = await Contract.deploy();
    await contract.deposit({ value: ONE });
    await expect(contract.withdraw(TWO)).to.be.revertedWith("Account does not have enough balance");
  });
});
