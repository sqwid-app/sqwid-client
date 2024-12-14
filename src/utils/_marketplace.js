import {ethers} from "ethers";
import {Interact} from "./connect";
import collectibleContractABI from "../constants/contracts/SqwidERC1155";
import marketplaceContractABI from "../constants/contracts/SqwidMarketplace";
import {getDwebURL} from "./getIPFSURL";
import axios from "axios";
import {getBackend, getContract} from "./network";

const collectibleContract = (signerOrProvider, address = null) =>
    new ethers.Contract(
        address || getContract("reef_testnet", "erc1155"),
        collectibleContractABI,
        signerOrProvider
    );
const marketplaceContract = signerOrProvider =>
    new ethers.Contract(
        getContract("reef_testnet", "marketplace"),
        marketplaceContractABI,
        signerOrProvider
    );

const getNameByAddress = async address => {
    try {
        const res = await axios(
            `${getBackend()}/get/user/${address}`
        );
        return res.data.displayName;
    } catch (e) {
        return address;
    }
};

// returns all marketplace items
const fetchMarketplaceItems = async () => {
    const {provider} = await Interact();
    const mContract = marketplaceContract(provider);
    const cContract = collectibleContract(provider);
    const items = await mContract.fetchMarketItems();
    const itemsWithDetails = [];
    for (let item of items) {
        try {
            let highestBid = await mContract.fetchHighestBid(item.itemId);
            let metaURI = await cContract.uri(item.tokenId);
            let res = await axios(getDwebURL(metaURI));
            let meta = res.data;
            res = await axios(
                `${getBackend()}/get/collections/id/${meta.properties.collection}`
            );
            let collection = res.data?.collection?.data;
            let obj = {
                itemId: Number(item.itemId),
                onSale: item.onSale,
                price: Number(item.price),
                seller: item.seller,
                creator: item.royaltyReceiver,
                highestBid: Number(highestBid.price),
                collection: {
                    name: collection.name,
                    image: getDwebURL(collection.image),
                },
                title: meta.name,
                media: {
                    cover: getDwebURL(meta.image),
                    mimeType: meta.properties.mimetype,
                    media: getDwebURL(meta.properties.media),
                },
            };
            itemsWithDetails.push(obj);
        } catch (err) {
            // process err
        }
    }
    return itemsWithDetails;
};

const marketplaceItemExists = async itemId => {
    const {provider} = await Interact();
    const mContract = marketplaceContract(provider);
    const item = await mContract.fetchMarketItem(itemId);
    return Number(item.itemId) !== 0;
};

// returns a certain marketplace item
const fetchMarketplaceItem = async itemId => {
    const {provider} = await Interact();
    const mContract = marketplaceContract(provider);
    const cContract = collectibleContract(provider);
    const item = await mContract.fetchMarketItem(itemId);
    let info;
    try {
        let metaURI = await cContract.uri(item.tokenId);
        let res = await axios(getDwebURL(metaURI));
        let meta = res.data;
        const creator = meta.properties.creator;
        res = await axios(
            `${getBackend()}/get/collections/id/${meta.properties.collection}`
        );
        let collection = res.data?.collection?.data;
        info = {
            itemId: Number(item.itemId),
            isOnSale: item.onSale,
            price: (Number(item.price) / 10 ** 18).toString(),
            owners: {
                current: {
                    id: item.seller,
                    name: await getNameByAddress(item.seller),
                    quantity: {
                        owns: 1,
                        total: 1,
                    },
                },
                total: 1,
            },
            creator: {
                id: creator,
                name: await getNameByAddress(creator),
            },
            bids: [],
            collection: {
                name: collection.name,
                id: meta.properties.collection,
                cover: getDwebURL(collection.image),
            },
            title: meta.name,
            description:
                meta.description.length > 0
                    ? meta.description
                    : "No description",
            contentURL: getDwebURL(meta.properties.media),
            properties: Object.keys(meta.properties.custom).map(key => {
                return {
                    key,
                    value: meta.properties.custom[key],
                };
            }),
            highestBid: "0",
            royalty: "0",
        };
    } catch (err) {
        // handle err
    }

    return info;
};

// puts an item up for sale (owner only)
const putOnSale = async (itemId, price) => {
};

// removes an item from sale (owner / seller only)
const removeFromSale = async itemId => {
};

// buy an item for asking price
const buyNow = async itemId => {
};

// fetch all bids for an item
const fetchBids = async itemId => {
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
const fetchHighestBid = async itemId => {
};

// returns the total number of tokens in existence
const getTokenSupply = async tokenId => {
};

// returns the total number of tokens in existence by itemId
const getTokenSupplyByItemId = async itemId => {
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
    getTokenSupplyByItemId,
};
