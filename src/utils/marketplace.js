import axios from 'axios';

// const getNameByAddress = async (address) => {
//     try {
//         const res = await axios (`${process.env.REACT_APP_API_URL}/api/get/user/${address}`);
//         return res.data.displayName;
//     } catch (e) {
//         return address;
//     }
// }

// returns all marketplace items
const fetchMarketplaceItems = async () => {
    const res = await axios (`${process.env.REACT_APP_API_URL}/api/get/r/marketplace/fetchMarketItems`);
    const { data } = res;
    if (data.error) {
        return [];
    }
    return data;
};
// returns a certain marketplace item
const fetchMarketplaceItem = async (itemId) => {
    const res = await axios (`${process.env.REACT_APP_API_URL}/api/get/r/marketplace/fetchMarketItem/${itemId}`);
    const { data } = res;
    if (data.error) {
        return null;
    }
    return data;
};

const marketplaceItemExists = async (itemId) => {
    const res = await axios (`${process.env.REACT_APP_API_URL}/api/get/r/marketplace/itemExists/${itemId}`);
    const { data } = res;
    if (data.error) {
        return false;
    }
    return data;
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
    marketplaceItemExists,
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