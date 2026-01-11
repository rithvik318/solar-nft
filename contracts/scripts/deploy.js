const hre = require("hardhat");

async function main() {
  const SolarPanelNFT = await hre.ethers.getContractFactory("SolarPanelNFT");
  const contract = await SolarPanelNFT.deploy();

  await contract.deployed();

  console.log("SolarPanelNFT deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
