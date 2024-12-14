import { ethers } from "ethers";
import { Interact } from "./connect";
import contractABI from "../constants/contracts/SqwidERC1155";
import { getContract } from "./network";

const approveMarketplace = async () => {
	console.log("inisde approveMarketplace component");
	let { signer } = await Interact();

	let contract = new ethers.Contract(
		getContract("erc1155"),
		contractABI,
		signer
	);   

	const tx = await contract.setApprovalForAll(
		getContract("marketplace"),
		true
	);
	return await tx.wait();
};

// const isMarketplaceApproved = async () => {
// 	console.log("inisde isMarketplaceApproved component");
// 	let { provider, signer } = await Interact();
// 	console.log("provider, signer inside isMarketplaceApproved", provider, signer )
// 	const address = await signer.getAddress();
// 	console.log("address from signer", address)
    
// 	let contract = new ethers.Contract(
// 		getContract("erc1155"),
// 		contractABI,
// 		provider
// 	);

// 	console.log("contract==", contract)
// 	console.log("Checking contract approval with:", address, getContract("marketplace"));

// 	const isApproved = await contract.isApprovedForAll(
// 		address,
// 		getContract("marketplace")
// 	);
// 	console.log("After isApproved")
// 	console.log("isApproved", isApproved);
// 	return isApproved;
// };

const isMarketplaceApproved = async () => {
	console.log("Inside isMarketplaceApproved component");
  
	try {
	  const { provider, signer } = await Interact();
	  console.log("Provider:", provider);
	  console.log("Signer:", signer);
  
	  const address = await signer.getAddress();
	  console.log("Address from signer:", address);
  
	  const marketplaceAddress = getContract("marketplace");
	  if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(marketplaceAddress)) {
		throw new Error(`Invalid addresses: Signer: ${address}, Marketplace: ${marketplaceAddress}`);
	  }
  
	  const contract = new ethers.Contract(getContract("erc1155"), contractABI, provider);
	  console.log("Contract instance created:", contract);
  
	  console.log("Checking contract approval with:", address, marketplaceAddress);
  
	  const isApproved = await contract.isApprovedForAll(address, marketplaceAddress);
	  console.log("Is Approved:", isApproved);
  
	  return isApproved;
	} catch (error) {
	  console.error("Contract call failed:", error);
	  
	  // Capture the error data if available
	  if (error.data && error.data.message) {
		console.error("Detailed revert reason:", error.data.message);
	  } else {
		console.error("No detailed revert reason provided.");
	  }
  
	  throw new Error("Contract interaction failed. Check the contract logs for details.");
	}
  };  
  

export { approveMarketplace, isMarketplaceApproved };
