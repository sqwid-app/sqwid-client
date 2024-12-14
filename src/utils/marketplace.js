import axios from "axios";
import { BigNumber, ethers } from "ethers";
import marketplaceContractABI from "../constants/contracts/SqwidMarketplace";
import utilityContractABI from "../constants/contracts/SqwidUtility";
import collectibleContractABI from "../constants/contracts/SqwidERC1155";
import { Interact } from "./connect";
import constants from "./constants";

import {
	isMarketplaceApproved,
	approveMarketplace,
} from "./marketplaceApproval";
import { getBackend, getContract } from "./network";

const marketplaceContract = signerOrProvider =>
	new ethers.Contract(
		getContract("marketplace"),
		marketplaceContractABI,
		signerOrProvider
	);
const utilityContract = signerOrProvider =>
	new ethers.Contract(
		getContract("utility"),
		utilityContractABI,
		signerOrProvider
	);
const collectibleContract = signerOrProvider =>
	new ethers.Contract(
		getContract("erc1155"),
		collectibleContractABI,
		signerOrProvider
	);

const checkAndApproveMarketplace = async () => {
	const approved = await isMarketplaceApproved();
	if (!approved) {
		await approveMarketplace();
	}
};

// returns all marketplace items
// const fetchMarketplaceItems = async () => {
//     const res = await axios (`${getBackend()}/get/r/marketplace/fetchMarketItems`);
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
		return { sale: [], auction: [], raffle: [], loan: [] };
	}
	return data;
};

const fetchFeaturedItems = async () => {
	const res = await axios(`${getBackend()}/get/marketplace/featured`);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data.featured.filter(item => item != null);
};

// returns collection info
const fetchCollectionInfo = async id => {
	try {
		const res = await axios(
			`${getBackend()}/get/marketplace/collection/${id}`
		);
		const { data } = res;
		if (data.error) {
			return [];
		}
		return data;
	} catch (error) {
		return {
			error: true,
		};
	}
};

// returns the state-wise items for a user
const fetchUserItems = async (address, state = -1, startFrom) => {
	let limit = constants.EXPLORE_PAGINATION_LIMIT;
	const res = await axios(
		`${getBackend()}/get/marketplace/by-owner/${address}${
			state >= 0 ? `/${state}` : ""
		}?limit=${limit}&startFrom=${startFrom}`
	);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns collection-wise items
const fetchCollectionItems = async (
	address,
	state = -1,
	startFrom,
	filterQuery = ""
) => {
	let limit = constants.EXPLORE_PAGINATION_LIMIT;
	const res = await axios(
		`${getBackend()}/get/marketplace/by-collection/${address}${
			state >= 0 ? `/${state}` : ""
		}?limit=${limit}&startFrom=${startFrom}${
			filterQuery ? `&` + filterQuery : ""
		}`
	);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

// returns the state-wise items
const fetchStateItems = async (state, startFrom) => {
	let limit = constants.EXPLORE_PAGINATION_LIMIT;
	const res = await axios(
		`${getBackend()}/get/marketplace/all/${state}?limit=${limit}&startFrom=${startFrom}`
	);
	const { data } = res;
	if (data.error) {
		return [];
	}
	return data;
};

const unlistPositionOnSale = async positionId => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.unlistPositionOnSale(
			positionId,
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const putItemOnSale = async (itemId, copies, price) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.putItemOnSale(
			itemId,
			copies,
			ethers.utils.parseEther(price),
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const createItemLoan = async (
	itemId,
	loanAmount,
	feeAmount,
	tokenAmount,
	duration
) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemLoan(
			itemId,
			ethers.utils.parseEther(loanAmount),
			ethers.utils.parseEther(feeAmount),
			tokenAmount,
			duration,
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const createItemAuction = async (itemId, tokenAmount, duration, minBid) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemAuction(
			itemId,
			tokenAmount,
			duration,
			ethers.utils.parseEther(minBid),
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const createItemRaffle = async (itemId, tokenAmount, duration) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createItemRaffle(
			itemId,
			tokenAmount,
			duration,
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const enterRaffle = async (itemId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.enterRaffle(itemId, {
			value: ethers.utils.parseEther(amount),
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const createBid = async (itemId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.createBid(itemId, {
			value: ethers.utils.parseEther(amount),
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};
const createSale = async (positionId, tokenAmount, price) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		// console.log (price.toLocaleString('fullwide', {useGrouping:false}));
		// console.log (tokenAmount, price, ethers.utils.parseEther(
		// 	(BigNumber.from (tokenAmount).mul (BigNumber.from (price.toLocaleString('fullwide', {useGrouping:false})))).toString()));
		const tx = await marketplaceContractInstance.createSale(
			positionId,
			tokenAmount,
			{
				// value: ethers.utils.parseEther(
				// 	(BigNumber.from (tokenAmount).mul (BigNumber.from (price.toLocaleString('fullwide', {useGrouping:false})))).toString()
				// ),
				value: BigNumber.from(tokenAmount).mul(price),
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const endAuction = async positionId => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.endAuction(positionId, {
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const endRaffle = async positionId => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.endRaffle(positionId, {
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const fundLoan = async (positionId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.fundLoan(positionId, {
			value: ethers.utils.parseEther(amount.toString()),
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const liquidateLoan = async positionId => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.liquidateLoan(positionId, {
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const repayLoan = async (positionId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.repayLoan(positionId, {
			value: ethers.utils.parseEther(amount.toString()),
			customData: {
				storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
			},
		});
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const unlistLoanProposal = async positionId => {
	await checkAndApproveMarketplace();
	try {
		const { signer } = await Interact();
		const marketplaceContractInstance = marketplaceContract(signer);
		const tx = await marketplaceContractInstance.unlistLoanProposal(
			positionId,
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

const burnCollectible = async (tokenId, amount) => {
	await checkAndApproveMarketplace();
	try {
		const address = JSON.parse(localStorage.getItem("auth"))?.auth
			?.evmAddress;
		const { signer } = await Interact();
		const collectibleContractInstance = collectibleContract(signer);
		const tx = await collectibleContractInstance.burn(
			address,
			tokenId,
			amount,
			{
				customData: {
					storageLimit: constants.DEFAULT_CONTRACT_STORAGE_LIMIT,
				},
			}
		);
		const receipt = await tx.wait();
		return receipt;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

export const fetchRaffleEntries = async positionId => {
	try {
		const { signer } = await Interact();
		const utilityContractInstance = utilityContract(signer);
		const entries = await utilityContractInstance.fetchRaffleEntries(
			positionId
		);
		return entries;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

export const fetchAuctionBids = async positionId => {
	try {
		const { signer } = await Interact();
		const utilityContractInstance = utilityContract(signer);
		const entries = await utilityContractInstance.fetchAuctionBids(
			positionId
		);
		return entries;
	} catch (error) {
		// console.error (error);
		return null;
	}
};

// --- old stuff ---

// returns a certain marketplace item
const fetchMarketplaceItem = async itemId => {
	const res = await axios(
		`${getBackend()}/get/r/marketplace/position/${itemId}`
	);
	const { data } = res;
	if (data.error) {
		return null;
	}
	data.media.cover = data.media.cover.replace(" ", "%20");
	data.media.url = data.media.url.replace(" ", "%20");
	return data;
};

const marketplaceItemExists = async itemId => {
	const res = await axios(
		`${getBackend()}/get/r/marketplace/itemExists/${itemId}`
	);
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
const removeFromSale = async itemId => {
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

// --- / old stuff ---

// returns the available balance for withdrawing
// eslint-disable-next-line
const getWithdrawableBalanceProvider = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth?.evmAddress;
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const balance = await marketplaceContractInstance.addressBalance(address);
	return balance.toNumber();
};
const getWithdrawableBalance = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	if (!jwt) return 0;
	const res = await axios(`${getBackend()}/get/marketplace/withdrawable`, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	});
	const { data } = res;
	if (data.error) return "0.00";
	return data.balance;
};

// withdraw available balance
const withdrawBalance = async () => {
	const { signer } = await Interact();
	const marketplaceContractInstance = marketplaceContract(signer);
	const tx = await marketplaceContractInstance.withdraw();
	const receipt = await tx.wait();
	return receipt;
};

const fetchRoyalties = async tokenId => {
	const { provider } = await Interact();
	const collectibleContractInstance = collectibleContract(provider);
	const royalties = await collectibleContractInstance.royaltyInfo(
		tokenId,
		100
	);
	return {
		receiver: royalties.receiver,
		amount: royalties.royaltyAmount.toNumber(),
	};
};

const fetchCollectionStats = async id => {
	// try {
	// 	const res = await axios(
	// 		`${getBackend()}/statswatch/collection/${id}/all`
	// 	);
	// 	const { data } = res;
	// 	return data;
	// } catch (e) {
	// 	return {
	// 		volume: 0,
	// 		average: 0,
	// 		lastSale: 0,
	// 		salesAmount: 0,
	// 		items: 0,
	// 		owners: 0
	// 	};
	// }
	// return {
	// 	volume: 0,
	// 	average: 0,
	// 	lastSale: 0,
	// 	salesAmount: 0,
	// 	items: 0,
	// 	owners: 0
	// };
	try {
		const res = await axios(
			`${getBackend()}/get/marketplace/collection/${id}/stats`
		);
		const { data } = res;
		return data;
	} catch (e) {
		return {
			volume: 0,
			average: 0,
			lastSale: 0,
			itemsSold: 0,
			items: 0,
			owners: 0,
		};
	}
};

const fetchCollectibleStats = async id => {
	try {
		const res = await axios(
			`${getBackend()}/statswatch/collectible/${id}/all`
		);
		const { data } = res;
		if (data.error) {
		}
		return data;
	} catch (e) {
		return {
			volume: 0,
			average: 0,
			lastSale: 0,
			salesAmount: 0,
			owners: 0,
		};
	}
};

const fetchCollectibleSaleHistory = async id => {
	try {
		const res = await axios(
			`${getBackend()}/statswatch/collectible/${id}/sale-history`
		);
		const { data } = res;
		return data;
	} catch (e) {
		return {
			sales: [],
		};
	}
};

const fetchOngoingBids = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	if (!jwt) return 0;
	const res = await axios(`${getBackend()}/get/marketplace/bids`, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	});
	const { data } = res;
	if (data.error) return [];
	return data;
};

const fetchClaimables = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	if (!jwt) return 0;
	try {
		const res = await axios(`${getBackend()}/get/marketplace/claimables`, {
			headers: {
				Authorization: `Bearer ${jwt.token}`,
			},
		});
		const { data } = res;
		if (data.error) return [];
		return data;
	} catch (e) {
		return [];
	}
};

const fetchClaimablesCount = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	if (!jwt) return 0;
	try {
		const res = await axios(
			`${getBackend()}/get/marketplace/claimables/count`,
			{
				headers: {
					Authorization: `Bearer ${jwt.token}`,
				},
			}
		);
		const { data } = res;
		if (data.error) return 0;
		return data.count;
	} catch (e) {
		return 0;
	}
};
const claimClaimables = async (itemId, tokenId) => {
	await checkAndApproveMarketplace();
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	if (!jwt) return 0;
	try {
		let receipt;
		try {
			const { signer } = await Interact();
			const marketplaceContractInstance = marketplaceContract(signer);
			const tx = await marketplaceContractInstance.addAvailableTokens(
				itemId
			);
			receipt = await tx.wait();
			const res = await axios.post(
				`${getBackend()}/claim/${tokenId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
					},
				}
			);
			const { data } = res;
			if (data.error)
				return {
					error: true,
					message: res.error.toString(),
				};
			return receipt;
		} catch (e) {
			// console.log (e);
			const retry =
				e.toString() === "Error: Cancelled" ||
				e.toString() ===
					"Error: -32603: execution fatal: Module { index: 6, error: 2, message: None }";

			if (!retry) {
				await axios.post(
					`${getBackend()}/claim/${tokenId}`,
					{
						remove: true,
					},
					{
						headers: {
							Authorization: `Bearer ${jwt.token}`,
						},
					}
				);
			}
			return {
				error: true,
				message: e.toString(),
			};
		}
	} catch (e) {
		return {
			error: true,
			message: e.toString(),
		};
	}
};

// Show images
// https://sqwid.infura-ipfs.io/ipfs/QmUN9DjxdUTEAo9Sy8UuwQaZ1LhXSDQi4TtcXLcq64onH5
const transferCollectible = async (to, tokenId, amount) => {
	console.log("tokenId=", tokenId);
	console.log("amount=", amount);
	const { signer } = await Interact();
	const from = await signer.getAddress();
	const collectibleContractInstance = collectibleContract(signer);
	const tx = await collectibleContractInstance.safeTransferFrom(
		from,
		to,
		Number(tokenId),
		Number(amount),   
		"0x"
	);     
	const receipt = await tx.wait();
	return receipt;
};

const fetchCollectionsByStats = async (
	order,
	// startFrom = Infinity,
	// startFromId = null,
	// sort = "desc",
	// limit = 8
) => {
	try {
		const res = await axios(
			`${getBackend()}/get/collections/all/by/stats.${order}`
		);
		const { data } = res;
		return data;
	} catch (e) {
		console.error("Error fetching collections:", e);
		return { collections: [] };
	}
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
	getWithdrawableBalance,
	withdrawBalance,
	fetchRoyalties,
	fetchFeaturedItems,
	fetchCollectionStats,
	fetchCollectibleStats,
	fetchCollectibleSaleHistory,
	fetchOngoingBids,
	burnCollectible,
	fetchClaimables,
	fetchClaimablesCount,
	claimClaimables,
	transferCollectible,
	fetchCollectionsByStats,
	// these are old, need to be removed
	marketplaceItemExists,
	fetchMarketplaceItem,
	putOnSale,
	removeFromSale,
	buyNow,
	addBid,
	cancelBid,
	acceptBid,
};
