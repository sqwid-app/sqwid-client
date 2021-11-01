import { ethers } from 'ethers';
import { Interact } from './connect';
import contractABI from '../constants/contracts/SqwidERC1155';
import { getDwebURL } from './getIPFSURL';

const getMetaById = async (id) => {
    let { provider } = await Interact ();

    let contract = new ethers.Contract (
        process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
        contractABI,
        provider
    );

    const meta = await contract.uri (id);
    return getDwebURL (meta);
};

export default getMetaById;