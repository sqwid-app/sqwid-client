import axios from 'axios';
import { ethers } from 'ethers';
import marketplaceContractABI from '../constants/contracts/SqwidMarketplace';
import utilityContractABI from '../constants/contracts/SqwidUtility';
import { GetProvider, Interact } from './connect';
import { getCloudflareURL, getDwebURL } from './getIPFSURL';

import { isMarketplaceApproved, approveMarketplace } from './marketplaceApproval';

const marketplaceContract = (signerOrProvider) => new ethers.Contract (process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, marketplaceContractABI, signerOrProvider);
const utilityContract = (signerOrProvider) => new ethers.Contract (process.env.REACT_APP_UTILITY_CONTRACT_ADDRESS, utilityContractABI, signerOrProvider);

const checkAndApproveMarketplace = async () => {
    const approved = await isMarketplaceApproved ();
    if (!approved) {
        await approveMarketplace ();
    }
}

const generateItemsDetails = async (items, collectionId = null) => {
    let itemsWithDetails = [];
    for (let item of items) {
        if (item.itemId === 0 || item.uri.length === 0) continue;
        try {
            const metaURI = getCloudflareURL (item.uri);
            let mres;
            try {
                mres = await axios (metaURI);
            } catch (err) {
                // console.log (err);
            }
            const meta = mres.data;
            if (collectionId && meta.properties.collection !== collectionId) continue;

            let colres = await axios (`${process.env.REACT_APP_API_URL}/get/collections/id/${meta.properties.collection}`);
            colres = colres.data;
            if (!colres) continue;
            
            let collection = colres.collection.data;
            let media = '';
            if (meta.properties.mimetype.startsWith ('audio')) {
                media = getCloudflareURL (meta.image);
                meta.properties.mimetype = 'image';
            } else if (meta.properties.mimetype.startsWith ('video')) {
                media = getDwebURL (meta.properties.media);
            } else if (meta.properties.mimetype.startsWith ('image')) {
                media = getCloudflareURL (meta.image);
            }
            let obj = {
                id: item.itemId.toString (),
                name: meta.name,
                isOnSale: item.isOnSale,
                collection: {
                    thumb: getCloudflareURL (collection.image),
                    name: collection.name,
                    id: meta.properties.collection
                },
                owner: {
                thumb:`https://avatars.dicebear.com/api/identicon/${item.currentOwner}.svg`,
                    name: item.currentOwner, //await getNameByAddress (item.currentOwner),
                    id: item.currentOwner,
                    others: 1
                },
                creator: {
                    thumb: `https://avatars.dicebear.com/api/identicon/${meta.properties.creator}.svg`,
                    name: meta.properties.creator,//await getNameByAddress (meta.properties.creator),
                    id: meta.properties.creator
                },
                media: {
                    url: media,
                    type: meta.properties.mimetype,
                },
                price: (Number (item.price) / (10 ** 18)).toString (),
                highestBid: (Number (item.highestBid) / (10 ** 18)).toString (),
                quantity: {
                    available: Number (item.currentOwnerBalance),
                    total: Number (item.totalSupply)
                }
            }
            itemsWithDetails.push (obj);
        } catch (err) {
            return {
                error: err
            }
        }
    }
    return itemsWithDetails;
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
    const provider = await GetProvider ();
    const utilContract = utilityContract (provider);

    const items = await utilContract.fetchMarketItems ();

    const itemsWithDetails = await generateItemsDetails (items);
    return itemsWithDetails;
}


// returns a certain marketplace item
const fetchMarketplaceItem = async (itemId) => {
    const res = await axios (`${process.env.REACT_APP_API_URL}/get/r/marketplace/fetchMarketItem/${itemId}`);
    const { data } = res;
    if (data.error) {
        return null;
    }
    return data;
};

const marketplaceItemExists = async (itemId) => {
    const res = await axios (`${process.env.REACT_APP_API_URL}/get/r/marketplace/itemExists/${itemId}`);
    const { data } = res;
    if (data.error) {
        return false;
    }
    return data;
};

// puts an item up for sale (owner only)
const putOnSale = async (itemId, price) => {
    await checkAndApproveMarketplace ();
    let realPrice = ethers.utils.parseEther (price);

    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    const tx = await marketplaceContractInstance.putOnSale (itemId, realPrice);
    const receipt = await tx.wait ();

    return receipt;
};

// removes an item from sale (owner / seller only)
const removeFromSale = async (itemId) => {
    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    const tx = await marketplaceContractInstance.removeFromSale (itemId);
    const receipt = await tx.wait ();

    return receipt;
};

// buy an item for asking price
const buyNow = async (itemId, amount, itemPrice) => {
    await checkAndApproveMarketplace ();
    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    let reefAmount = Number (itemPrice) * Number (amount);
    const val = ethers.utils.parseEther (reefAmount.toString ());
    const tx = await marketplaceContractInstance.buyNow (itemId, amount, {
        value: val,
    });
    const receipt = await tx.wait ();
    return receipt;
};

// fetch all bids for an item
const fetchBids = async (itemId) => {

};

// add a bid to an item
const addBid = async (itemId, price, amount) => {
    await checkAndApproveMarketplace ();
    // console.log (itemId, price, amount);
    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    let reefAmount = Number (price) * Number (amount);
    const val = ethers.utils.parseEther (reefAmount.toString ());
	// console.log(Number(val));
    const tx = await marketplaceContractInstance.addBid (itemId, amount, {
        value: val,
    });
    const receipt = await tx.wait ();
    return receipt;
};

// removes a bid (bidder only)
const cancelBid = async (itemId, bidId) => {
    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    const tx = await marketplaceContractInstance.cancelBid (itemId, bidId);
    const receipt = await tx.wait ();
    return receipt;
};

// accepts a bid (seller only)
const acceptBid = async (itemId, bidId) => {
    const { signer } = await Interact ();
    const marketplaceContractInstance = marketplaceContract (signer);
    const tx = await marketplaceContractInstance.acceptBid (itemId, bidId);
    const receipt = await tx.wait ();
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