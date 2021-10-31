import { ethers } from 'ethers';
import { Interact } from './connect';
import contractABI from '../constants/contracts/SqwidERC1155';

// DON'T USE THIS ONE YET
const getTokensByOwner = async (id) => {
    let { provider } = await Interact ();

    let contract = new ethers.Contract (
        process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
        contractABI,
        provider
    );

    const tokens = await contract.getTokensByOwner (id);
    return tokens;
};

export default getTokensByOwner;