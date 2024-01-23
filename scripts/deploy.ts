import { ethers } from "hardhat";

async function main() {
  // const [deployer] = await ethers.getSigners();
  // console.log("Deploying contract with the account:", deployer.address);

  const Contract = await ethers.getContractFactory("BlockCloud");
  const upload = await Contract.deploy();

  await upload.waitForDeployment();

  console.log("Contract deployed to:", upload.target);
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exit(1);
});

// npx hardhat run --network localhost scripts/deploy.ts