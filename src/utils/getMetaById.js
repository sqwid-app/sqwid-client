import { ethers } from "ethers";
import { Interact } from "./connect";
import contractABI from "../constants/contracts/SqwidERC1155";
import { getDwebURL } from "./getIPFSURL";
import { getContract } from "./network";

const getMetaById = async id => {
	let { provider } = await Interact();

	let contract = new ethers.Contract(
		getContract("erc1155"),
		contractABI,
		provider
	);

	const meta = await contract.uri(id);
	return getDwebURL(meta);
};

export default getMetaById;
