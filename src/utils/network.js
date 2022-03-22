import { networks, defaultNetwork } from "constants/networks";
import constants from "./constants";

const getCurrentNetwork = () => {
	return (
		localStorage.getItem(`${constants.APP_NAME}__chosen_network`) ||
		defaultNetwork
	);
};

export const getNetwork = () => {
	const network = getCurrentNetwork();
	return networks[network];
};

export const getRPC = () => {
	const network = getCurrentNetwork();
	return getNetwork(network).rpc;
};

export const getContract = contract => {
	const network = getCurrentNetwork();
	return getNetwork(network).contracts[contract];
};

export const getBackend = () => {
	const network = getCurrentNetwork();
	return getNetwork(network).backend;
};
