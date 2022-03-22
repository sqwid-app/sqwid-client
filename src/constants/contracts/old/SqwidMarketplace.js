let ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "bidId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "bidder",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "BidAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "nftContract",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "creator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "royaltyRecipient",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "royaltyAmount",
				type: "uint256",
			},
		],
		name: "ItemCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "nftContract",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "ItemSold",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "bidId",
				type: "uint256",
			},
		],
		name: "acceptBid",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "addBid",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "buyNow",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "bidId",
				type: "uint256",
			},
		],
		name: "cancelBid",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftContract",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "createMarketItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "currentId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "bidId",
				type: "uint256",
			},
		],
		name: "fetchBid",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "bidId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "bidder",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "active",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.Bid",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "fetchBidCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "fetchBids",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "bidId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "bidder",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "active",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.Bid[]",
				name: "bids",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "fetchHighestBid",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "bidId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "bidder",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "active",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.Bid",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "fetchMarketItem",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "nftContract",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "seller",
						type: "address",
					},
					{
						internalType: "address payable",
						name: "royaltyReceiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "royaltyAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "onSale",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.MarketItem",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "fetchMarketItems",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "nftContract",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "seller",
						type: "address",
					},
					{
						internalType: "address payable",
						name: "royaltyReceiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "royaltyAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "onSale",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.MarketItem[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftContract",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "fetchMarketItemsByTokenId",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "nftContract",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "seller",
						type: "address",
					},
					{
						internalType: "address payable",
						name: "royaltyReceiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "royaltyAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "onSale",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.MarketItem[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "seller",
				type: "address",
			},
		],
		name: "fetchMarketItemsFromSeller",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "nftContract",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "seller",
						type: "address",
					},
					{
						internalType: "address payable",
						name: "royaltyReceiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "royaltyAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "onSale",
						type: "bool",
					},
				],
				internalType: "struct SqwidMarketplace.MarketItem[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPlatformFeePercent",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "tokenURI",
				type: "string",
			},
			{
				internalType: "address",
				name: "royaltyRecipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "royaltyValue",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "nftContract",
				type: "address",
			},
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "platformFee",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "putOnSale",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "removeFromSale",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint16",
				name: "_platformFee",
				type: "uint16",
			},
		],
		name: "setPlatformFeePercent",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "_platformFeeRecipient",
				type: "address",
			},
		],
		name: "setPlatformFeeRecipient",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "tokenBalanceByItemId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export default ABI;
