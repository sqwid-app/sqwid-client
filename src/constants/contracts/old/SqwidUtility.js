let ABI = [
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
						internalType: "bool",
						name: "isOnSale",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "currentOwner",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "currentOwnerBalance",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalSupply",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "highestBid",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "royalty",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "uri",
						type: "string",
					},
				],
				internalType: "struct SqwidMarketUtility.MarketItemReturn",
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
						internalType: "bool",
						name: "isOnSale",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "currentOwner",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "currentOwnerBalance",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalSupply",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "highestBid",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "royalty",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "uri",
						type: "string",
					},
				],
				internalType: "struct SqwidMarketUtility.MarketItemReturn[]",
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
				name: "owner",
				type: "address",
			},
		],
		name: "fetchMarketItemsByOwner",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "itemId",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isOnSale",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "currentOwner",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "currentOwnerBalance",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalSupply",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "highestBid",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "royalty",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "uri",
						type: "string",
					},
				],
				internalType: "struct SqwidMarketUtility.MarketItemReturn[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getERC1155Address",
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
		name: "getMarketplaceAddress",
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
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "erc1155Address",
				type: "address",
			},
		],
		name: "setERC1155",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "marketplaceAddress",
				type: "address",
			},
		],
		name: "setMarketplace",
		outputs: [],
		stateMutability: "nonpayable",
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
