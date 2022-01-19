import networks from 'constants/networks';

export const getNetwork = (network = 'reef_testnet') => {
    return networks[network];
}

export const getRPC = (network = 'reef_testnet') => {
    return getNetwork (network).rpc;
}

export const getContract = (network = 'reef_testnet', contract) => {
    return getNetwork (network).contracts[contract];
}
