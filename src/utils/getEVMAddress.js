import { ethers } from "ethers";
import { Interact } from "./connect";

const getEVMAddress = async address => {
	let { provider } = await Interact();

	address = await provider.api.query.evmAccounts.evmAddresses(address);
	address = (0, ethers.utils.getAddress)(address.toString());

	return address;
};

export default getEVMAddress;
