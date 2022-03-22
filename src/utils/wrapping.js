import { getContract } from "./network";
import { Interact } from "./connect";
import { ethers } from "ethers";
import wrapperABI from "constants/contracts/SqwidWrapper";
import ERC721ABI from "constants/contracts/SqwidERC721";
import ERC1155ABI from "constants/contracts/SqwidERC1155";

// export const isWrapperApproved = async (contractAddress) => {
//     let { signer } = await Interact ();
//     let contract = new ethers.Contract (
//         getContract ('reef_testnet', 'wrapper'),
//         wrapperABI,
//         signer
//     );

//     const isApproved = await contract.isApproved (contractAddress);
//     return isApproved;
// }

// export const approveWrapper = async (contractAddress) => {
//     let { signer } = await Interact ();
//     let contract = new ethers.Contract (
//         getContract ('reef_testnet', 'wrapper'),
//         wrapperABI,
//         signer
//     );

//     const receipt = await contract.approve (contractAddress);
//     return receipt;
// }

const doApproval = async (contract, signer, contractAddress) => {
	const isApproved = await contract.isApproved(contractAddress);
	if (!isApproved) {
		let erc721Contract = new ethers.Contract(
			contractAddress,
			ERC721ABI,
			signer
		);
		let erc1155Contract = new ethers.Contract(
			getContract("erc1155"),
			ERC1155ABI,
			signer
		);

		await erc721Contract.setApprovalForAll(getContract("wrapper"), true);
		await erc1155Contract.setApprovalForAll(getContract("wrapper"), true);
	}
};

export const wrap = async (contractAddress, eip, wrappedId) => {
	let { signer } = await Interact();
	let contract = new ethers.Contract(
		getContract("wrapper"),
		wrapperABI,
		signer
	);

	try {
		await doApproval(contract, signer, contractAddress);
	} catch (err) {
		// console.log (err);
	}

	// console log the receipt
	// console.log (contractAddress, wrappedId);

	if (eip === "erc721") {
		//eslint-disable-next-line
		const receipt = await contract.wrapERC721(
			contractAddress,
			Number(wrappedId)
		);
		// console.log (receipt);
	} else if (eip === "erc1155") {
		//eslint-disable-next-line
		const receipt = await contract.wrapERC1155(
			contractAddress,
			Number(wrappedId)
		);
		// console.log (receipt);
	}
};

export const unwrap = async (eip, wrappedId) => {
	let { signer } = await Interact();
	let contract = new ethers.Contract(
		getContract("wrapper"),
		wrapperABI,
		signer
	);

	if (eip === "erc721") {
		//eslint-disable-next-line
		const receipt = await contract.unwrapERC721(wrappedId);
		// console.log (receipt);
	} else if (eip === "erc1155") {
		//eslint-disable-next-line
		const receipt = await contract.unwrapERC1155(wrappedId);
		// console.log (receipt);
	}
};
