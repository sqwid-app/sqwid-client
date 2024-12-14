import { networks, defaultNetwork } from "constants/networks";
import constants from "./constants";

export const getCurrentNetwork = () => {
	console.log("here inside getCurrentNetwork 3");

	return (
		localStorage.getItem(`${constants.APP_NAME}__chosen_network`) ||
		defaultNetwork
	);
};

export const getNetworkConfig = () => {
	console.log("here inside getNetworkConfig 2");

	const network = getCurrentNetwork();   
	return networks[network];   
};

export const getRPC = () => {
	return getNetworkConfig().rpc;
};

export const getContract = contract => {
	console.log("here inside getContract 1");
	return getNetworkConfig().contracts[contract];
};

export const getBackend = () => {
	return getNetworkConfig().backend;
};
