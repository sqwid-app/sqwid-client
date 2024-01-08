import { networks, defaultNetwork } from "constants/networks";
import constants from "./constants";

export const getCurrentNetwork = () => {
	return (
		localStorage.getItem(`${constants.APP_NAME}__chosen_network`) ||
		defaultNetwork
	);
};

export const getNetworkConfig = () => {
	const network = getCurrentNetwork();
	return networks[network];
};

export const getRPC = () => {
	return getNetworkConfig().rpc;
};

export const getContract = contract => {
	return getNetworkConfig().contracts[contract];
};

export const getBackend = () => {
	return getNetworkConfig().backend;
};
