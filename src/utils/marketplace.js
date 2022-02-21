import axios from 'axios';
import { ethers } from 'ethers';
import marketplaceContractABI from '../constants/contracts/SqwidMarketplace';
import utilityContractABI from '../constants/contracts/SqwidUtility';
import { Interact } from './connect';
import constants from './constants';

import { isMarketplaceApproved, approveMarketplace } from './marketplaceApproval';
import { getBackend, getContract } from './network';

const marketplaceContract = (signerOrProvider) => new ethers.Contract(getContract('marketplace'), marketplaceContractABI, signerOrProvider);
const utilityContract = (signerOrProvider) => new ethers.Contract(getContract('utility'), utilityContractABI, signerOrProvider);

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

// returns items for explore page
const fetchMarketplaceItems = async () => {
	const res = await axios(`${getBackend()}/get/marketplace/summary`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns collection info
const fetchCollectionInfo = async (id) => {
	try {
		const res = await axios(`${getBackend()}/get/marketplace/collection/${id}`);
		const { data } = res;
		if (data.error) {
			return [];
		}
		return data;
	} catch (error) {
		return {
			"error": true,
		}
	}
};

// returns the state-wise items for a user
const fetchUserItems = async (address, state = -1, pageNumber = 1) => {
	const res = await axios(`${getBackend()}/get/marketplace/by-owner/${address}${state >= 0 ? `/${state}` : ""}?perPage=${constants.EXPLORE_PAGINATION_LIMIT}&page=${pageNumber}`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns collection-wise items
const fetchCollectionItems = async (address, state = -1, pageNumber = 1) => {
	const res = await axios(`${getBackend()}/get/marketplace/by-collection/${address}${state >= 0 ? `/${state}` : ""}?perPage=${constants.EXPLORE_PAGINATION_LIMIT}&page=${pageNumber}`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns the state-wise items
const fetchStateItems = async (state, pageNumber = 1) => {
	const res = await axios(`${getBackend()}/get/marketplace/all/${state}?perPage=${constants.EXPLORE_PAGINATION_LIMIT}&page=${pageNumber}`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

const unlistPositionOnSale = async (positionId) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.unlistPositionOnSale(positionId);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const putItemOnSale = async (itemId, copies, price) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.putItemOnSale(itemId, copies, ethers.utils.parseEther(price));
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}


const createItemLoan = async (itemId, loanAmount, feeAmount, tokenAmount, duration) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemLoan(itemId, ethers.utils.parseEther(loanAmount), ethers.utils.parseEther(feeAmount), tokenAmount, duration);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const createItemAuction = async (itemId, tokenAmount, duration, minBid) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemAuction(itemId, tokenAmount, duration, ethers.utils.parseEther(minBid));
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const createItemRaffle = async (itemId, tokenAmount, duration) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemRaffle(itemId, tokenAmount, duration);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const enterRaffle = async (itemId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.enterRaffle(itemId, {
			value: ethers.utils.parseEther(amount),
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const createBid = async (itemId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createBid(itemId, {
			value: ethers.utils.parseEther(amount),
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const createSale = async (positionId, tokenAmount, price) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createSale(positionId, tokenAmount, {
			value: ethers.utils.parseEther((Number(tokenAmount) * Number(price)).toString()),
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const endAuction = async (positionId) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.endAuction (positionId);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const endRaffle = async (positionId) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.endRaffle (positionId);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const fundLoan = async (positionId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.fundLoan(positionId, {
			value: ethers.utils.parseEther(amount.toString ()),
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};


const liquidateLoan = async (positionId) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.liquidateLoan(positionId);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const repayLoan = async (positionId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.repayLoan (positionId, {
			value: ethers.utils.parseEther(amount.toString ()),
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

const unlistLoanProposal = async (positionId) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.unlistLoanProposal (positionId);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};


export const fetchRaffleEntries = async (positionId) => {
	try {
		const { signer } = await Interact();
		const utilityContractInstance = utilityContract(signer);
		const entries = await utilityContractInstance.fetchRaffleEntries(positionId);
		return entries;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

export const fetchAuctionBids = async (positionId) => {
	try {
		const { signer } = await Interact();
		const utilityContractInstance = utilityContract(signer);
		const entries = await utilityContractInstance.fetchAuctionBids(positionId);
		return entries;
	} catch (error) {
		// console.error (error);
		return null;
	}
}

// --- old stuff ---

// returns a certain marketplace item
const fetchMarketplaceItem = async (itemId) => {
	const res = await axios(`${process.env.REACT_APP_API_URL}/get/r/marketplace/position/${itemId}`);
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

export {
	unlistLoanProposal,
	repayLoan,
	liquidateLoan,
	fundLoan,
	endRaffle,
	endAuction,
	createSale,
	createBid,
	enterRaffle,
	createItemRaffle,
	createItemAuction,
	createItemLoan,
	putItemOnSale,
	unlistPositionOnSale,
	fetchStateItems,
	fetchMarketplaceItems,
	fetchUserItems,
	fetchCollectionItems,
	fetchCollectionInfo,
	// these are old, need to be removed
	marketplaceItemExists,
	fetchMarketplaceItem,
	putOnSale,
	removeFromSale,
	buyNow,
	addBid,
	cancelBid,
	acceptBid
}