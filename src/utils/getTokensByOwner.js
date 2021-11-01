import { ethers } from 'ethers';
import { Interact } from './connect';
import contractABI from '../constants/contracts/SqwidERC1155';
import getEVMAddress from './getEVMAddress';

const getTokensByOwner = async (address, evm = false) => {
    let { provider } = await Interact ();

    if (!evm) address = await getEVMAddress (address);

    let contract = new ethers.Contract (
        process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
        contractABI,
        provider
    );

    const tokens = await contract.getTokensByOwner (address);
    let converted = tokens.map (t => Number (t));

    let tokensByOwner = {};

    for (let i = 0; i < converted.length; i++) {
        tokensByOwner[i.toString ()] = converted[i];
    }
    return tokensByOwner;
};

export default getTokensByOwner;