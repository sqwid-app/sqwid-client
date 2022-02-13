import { ethers } from 'ethers';
import { Interact } from './connect';
import contractABI from '../constants/contracts/SqwidERC1155';
import { getContract } from './network';

const getTokensByOwner = async (id) => {
    let { provider } = await Interact ();

    let contract = new ethers.Contract (
        getContract ('erc1155'),
        contractABI,
        provider
    );

    const supply = await contract.getTokenSupply (id);

    return Number (supply);
};

export default getTokensByOwner;