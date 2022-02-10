import { networks, defaultNetwork } from 'constants/networks';

export const getNetwork = (network = defaultNetwork) => {
    return networks[network];
}

export const getRPC = (network = defaultNetwork) => {
    return getNetwork (network).rpc;
}

export const getContract = (network = defaultNetwork, contract) => {
    return getNetwork (network).contracts[contract];
}

export const getBackend = (network = defaultNetwork) => {
    return getNetwork (network).backend;
}