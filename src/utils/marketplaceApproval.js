import { ethers } from 'ethers';
import { Interact } from './connect';
import contractABI from '../constants/contracts/SqwidERC1155';

const approveMarketplace = async () => {
    let { signer } = await Interact ();

    let contract = new ethers.Contract (
        process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
        contractABI,
        signer
    );

    const tx = await contract.setApprovalForAll (process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, true);
    return await tx.wait ();
};

const isMarketplaceApproved = async () => {
    let { provider, signer } = await Interact ();
    const address = await signer.getAddress ();

    let contract = new ethers.Contract (
        process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
        contractABI,
        provider
    );

    const isApproved = await contract.isApprovedForAll (address, process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
    return isApproved;
};

export { approveMarketplace, isMarketplaceApproved };