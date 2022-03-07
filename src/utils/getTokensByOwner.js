import { ethers } from "ethers";
import { Interact } from "./connect";
import contractABI from "../constants/contracts/SqwidERC1155";
import getEVMAddress from "./getEVMAddress";
import { getContract } from "./network";

const getTokensByOwner = async (address, evm = false) => {
	let { provider } = await Interact();

	if (!evm) address = await getEVMAddress(address);

	let contract = new ethers.Contract(
		getContract("erc1155"),
		contractABI,
		provider
	);

	const tokens = await contract.getTokensByOwner(address);
	let converted = tokens.map(t => Number(t));

	let tokensByOwner = {};

	for (let i = 0; i < converted.length; i++) {
		tokensByOwner[i.toString()] = converted[i];
	}
	return tokensByOwner;
};

export default getTokensByOwner;
