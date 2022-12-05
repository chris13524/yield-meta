import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("YieldMeta");
  const contract = await Contract.deploy();

  await contract.deployed(); // TODO do we need this?
  console.log(contract.address)

  console.log("deployed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
