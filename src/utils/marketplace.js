import { ethers } from 'ethers';
import { Interact } from './connect';
import collectibleContractABI from '../constants/contracts/SqwidERC1155';
import marketplaceContractABI from '../constants/contracts/SqwidMarketplace';
import { getDwebURL } from './getIPFSURL';
import axios from 'axios';

const collectibleContract = (signerOrProvider, address = null) => new ethers.Contract (address || process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS, collectibleContractABI, signerOrProvider);
const marketplaceContract = (signerOrProvider) => new ethers.Contract (process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, marketplaceContractABI, signerOrProvider);

// returns all marketplace items
const fetchMarketplaceItems = async () => {
    const { provider } = await Interact ();
    const mContract = marketplaceContract (provider);
    const cContract = collectibleContract (provider);
    const items = await mContract.fetchMarketItems ();
    const itemsWithDetails = [];
    for (let item of items) {
        try {
            let highestBid = await mContract.fetchHighestBid (item.itemId);
            let metaURI = await cContract.uri (item.tokenId);
            let res = await axios (getDwebURL (metaURI));
            let meta = res.data;
            res = await axios (`${process.env.REACT_APP_API_URL}/api/get/collections/id/${meta.properties.collection}`);
            let collection = res.data?.collection?.data;
            let obj = {
                itemId: Number (item.itemId),
                onSale: item.onSale,
                price: Number (item.price),
                seller: item.seller,
                creator: item.royaltyReceiver,
                highestBid: Number (highestBid.price),
                collection: {
                    name: collection.name,
                    image: getDwebURL (collection.image),
                },
                title: meta.name,
                media: {
                    cover: getDwebURL (meta.image),
                    mimeType: meta.properties.mimetype,
                    media: getDwebURL (meta.properties.media)
                }
            }
            itemsWithDetails.push (obj);
        } catch (err) {
            console.error (err);
        }
    }
    
    console.log (itemsWithDetails);
    return itemsWithDetails;
};

// returns a certain marketplace item
const fetchMarketplaceItem = async (itemId) => {
    const { provider } = await Interact ();
    const mContract = marketplaceContract (provider);
    const cContract = collectibleContract (provider);
    const item = await mContract.fetchMarketItem (itemId);
    let info;
    try {
        let metaURI = await cContract.uri (item.tokenId);
        let res = await axios (getDwebURL (metaURI));
        let meta = res.data;
        res = await axios (`${process.env.REACT_APP_API_URL}/api/get/collections/id/${meta.properties.collection}`);
        let collection = res.data?.collection?.data;
        info = {
            itemId: Number (item.itemId),
            isOnSale: item.onSale,
            price: (Number (item.price) / 10 ** 18).toString (),
            owners: {
                current: {
                    id: item.seller,
                    name: '',
                    quantity: {
                        owns: 1,
                        total: 1
                    }
                },
                total: 1
            },
            creator: {
                id: item.royaltyReceiver,
                name: ''
            },
            bids: [],
            collection: {
                name: collection.name,
                id: meta.properties.collection,
                cover: getDwebURL (collection.image),
            },
            title: meta.name,
            contentURL: getDwebURL (meta.properties.media),
            properties: meta.properties.custom
        }
    } catch (err) {
        console.error (err);
    }

    return info;
};

// puts an item up for sale (owner only)
const putOnSale = async (itemId, price) => {

};

// removes an item from sale (owner / seller only)
const removeFromSale = async (itemId) => {
    
};

// buy an item for asking price
const buyNow = async (itemId) => {

};

// fetch all bids for an item
const fetchBids = async (itemId) => {

};

// add a bid to an item
const addBid = async (itemId, price) => {

};

// removes a bid (bidder only)
const removeBid = async (itemId, bidId) => {

};

// accepts a bid (seller only)
const acceptBid = async (itemId, bidId) => {

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
    fetchMarketplaceItems,
    fetchMarketplaceItem,
    putOnSale,
    removeFromSale,
    buyNow,
    fetchBids,
    addBid,
    removeBid,
    acceptBid,
    fetchHighestBid,
    getTokenSupply,
    getTokenSupplyByItemId
}