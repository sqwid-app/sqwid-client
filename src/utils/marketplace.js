import axios from 'axios';
import { ethers } from 'ethers';
import marketplaceContractABI from '../constants/contracts/SqwidMarketplace';
import { Interact } from './connect';

import { isMarketplaceApproved, approveMarketplace } from './marketplaceApproval';
import { getBackend, getContract } from './network';

const marketplaceContract = (signerOrProvider) => new ethers.Contract(getContract('reef_testnet', 'marketplace'), marketplaceContractABI, signerOrProvider);

const checkAndApproveMarketplace = async () => {
	const approved = await isMarketplaceApproved();
	if (!approved) {
		await approveMarketplace();
	}
}

// returns all marketplace items
// const fetchMarketplaceItems = async () => {
//     const res = await axios (`${process.env.REACT_APP_API_URL}/get/r/marketplace/fetchMarketItems`);
//     const { data } = res;
//     if (data.error) {
//         return [];
//     }
//     return data;
// };

const fetchMarketplaceItems = async () => {
	const res = await axios(`${getBackend()}/get/marketplace/summary`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns a certain marketplace item
const fetchMarketplaceItem = async (itemId) => {
	const res = await axios(`${process.env.REACT_APP_API_URL}/get/r/marketplace/fetchMarketItem/${itemId}`);
	const { data } = res;
	if (data.error) {
		return null;
	}
	data.media.cover = data.media.cover.replace(' ', '%20');
	data.media.url = data.media.url.replace(' ', '%20');
	return data;
};

const marketplaceItemExists = async (itemId) => {
	const res = await axios(`${process.env.REACT_APP_API_URL}/get/r/marketplace/itemExists/${itemId}`);
	const { data } = res;
	if (data.error) {
		return false;
	}
	return data;
};

// puts an item up for sale (owner only)
const putOnSale = async (itemId, price) => {
	await checkAndApproveMarketplace();
	let realPrice = ethers.utils.parseEther(price);

	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const tx = await marketplaceContractInstance.putOnSale(itemId, realPrice);
	const receipt = await tx.wait();

	return receipt;
};

// removes an item from sale (owner / seller only)
const removeFromSale = async (itemId) => {
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const tx = await marketplaceContractInstance.removeFromSale(itemId);
	const receipt = await tx.wait();

	return receipt;
};

// buy an item for asking price
const buyNow = async (itemId, amount, itemPrice) => {
	await checkAndApproveMarketplace();
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	let reefAmount = Number(itemPrice) * Number(amount);
	const val = ethers.utils.parseEther(reefAmount.toString());
	const tx = await marketplaceContractInstance.buyNow(itemId, amount, {
		value: val,
	});
	const receipt = await tx.wait();
	return receipt;
};

// fetch all bids for an item
const fetchBids = async (itemId) => {

};

// add a bid to an item
const addBid = async (itemId, price, amount) => {
	await checkAndApproveMarketplace();
	// console.log (itemId, price, amount);
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	let reefAmount = Number(price) * Number(amount);
	const val = ethers.utils.parseEther(reefAmount.toString());
	// console.log(Number(val));
	const tx = await marketplaceContractInstance.addBid(itemId, amount, {
		value: val,
	});
	const receipt = await tx.wait();
	return receipt;
};

// removes a bid (bidder only)
const cancelBid = async (itemId, bidId) => {
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const tx = await marketplaceContractInstance.cancelBid(itemId, bidId);
	const receipt = await tx.wait();
	return receipt;
};

// accepts a bid (seller only)
const acceptBid = async (itemId, bidId) => {
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const tx = await marketplaceContractInstance.acceptBid(itemId, bidId);
	const receipt = await tx.wait();
	return receipt;
};

// returns the highest bid for a certain item
const fetchHighestBid = async (itemId) => {

};

// returns the total number of tokens in existence
const getTokenSupply = async (tokenId) => {

};

// returns the total number of tokens in existence by itemId
const getTokenSupplyByItemId = async (itemId) => {

};

export {
	marketplaceItemExists,
	fetchMarketplaceItems,
	fetchMarketplaceItem,
	putOnSale,
	removeFromSale,
	buyNow,
	fetchBids,
	addBid,
	cancelBid,
	acceptBid,
	fetchHighestBid,
	getTokenSupply,
	getTokenSupplyByItemId
}