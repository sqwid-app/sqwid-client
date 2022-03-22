let ABI = [
	{
		inputs: [
			{
				internalType: "contract ISqwidMarketplace",
				name: "marketplace_",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
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
				internalType: "address",
				name: "targetAddress",
				type: "address",
			},
		],
		name: "fetchAddressItemsCreated",
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
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						components: [
							{
								internalType: "address",
								name: "seller",
								type: "address",
							},
							{
								internalType: "address",
								name: "buyer",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "price",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256",
							},
						],
						internalType: "struct ISqwidMarketplace.ItemSale[]",
						name: "sales",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "positionId",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "itemId",
								type: "uint256",
							},
							{
								internalType: "address payable",
								name: "owner",
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
								internalType: "uint256",
								name: "marketFee",
								type: "uint256",
							},
							{
								internalType:
									"enum ISqwidMarketplace.PositionState",
								name: "state",
								type: "uint8",
							},
						],
						internalType: "struct ISqwidMarketplace.Position[]",
						name: "positions",
						type: "tuple[]",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.ItemResponse[]",
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
				name: "targetAddress",
				type: "address",
			},
		],
		name: "fetchAddressPositions",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "positionId",
						type: "uint256",
					},
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
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "positionCount",
								type: "uint256",
							},
							{
								components: [
									{
										internalType: "address",
										name: "seller",
										type: "address",
									},
									{
										internalType: "address",
										name: "buyer",
										type: "address",
									},
									{
										internalType: "uint256",
										name: "price",
										type: "uint256",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType:
									"struct ISqwidMarketplace.ItemSale[]",
								name: "sales",
								type: "tuple[]",
							},
						],
						internalType: "struct ISqwidMarketplace.Item",
						name: "item",
						type: "tuple",
					},
					{
						internalType: "address payable",
						name: "owner",
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
						internalType: "uint256",
						name: "marketFee",
						type: "uint256",
					},
					{
						internalType: "enum ISqwidMarketplace.PositionState",
						name: "state",
						type: "uint8",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "minBid",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "highestBidder",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "highestBid",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.AuctionDataResponse",
						name: "auctionData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalValue",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.RaffleDataResponse",
						name: "raffleData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "loanAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "feeAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "numMinutes",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "lender",
								type: "address",
							},
						],
						internalType: "struct ISqwidMarketplace.LoanData",
						name: "loanData",
						type: "tuple",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.PositionResponse[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "fetchAllItems",
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
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						components: [
							{
								internalType: "address",
								name: "seller",
								type: "address",
							},
							{
								internalType: "address",
								name: "buyer",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "price",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256",
							},
						],
						internalType: "struct ISqwidMarketplace.ItemSale[]",
						name: "sales",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "positionId",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "itemId",
								type: "uint256",
							},
							{
								internalType: "address payable",
								name: "owner",
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
								internalType: "uint256",
								name: "marketFee",
								type: "uint256",
							},
							{
								internalType:
									"enum ISqwidMarketplace.PositionState",
								name: "state",
								type: "uint8",
							},
						],
						internalType: "struct ISqwidMarketplace.Position[]",
						name: "positions",
						type: "tuple[]",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.ItemResponse[]",
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
				internalType: "uint256",
				name: "positionId",
				type: "uint256",
			},
		],
		name: "fetchAuctionBids",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
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
		name: "fetchItem",
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
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						components: [
							{
								internalType: "address",
								name: "seller",
								type: "address",
							},
							{
								internalType: "address",
								name: "buyer",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "price",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256",
							},
						],
						internalType: "struct ISqwidMarketplace.ItemSale[]",
						name: "sales",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "positionId",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "itemId",
								type: "uint256",
							},
							{
								internalType: "address payable",
								name: "owner",
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
								internalType: "uint256",
								name: "marketFee",
								type: "uint256",
							},
							{
								internalType:
									"enum ISqwidMarketplace.PositionState",
								name: "state",
								type: "uint8",
							},
						],
						internalType: "struct ISqwidMarketplace.Position[]",
						name: "positions",
						type: "tuple[]",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.ItemResponse",
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
				name: "positionId",
				type: "uint256",
			},
		],
		name: "fetchPosition",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "positionId",
						type: "uint256",
					},
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
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "positionCount",
								type: "uint256",
							},
							{
								components: [
									{
										internalType: "address",
										name: "seller",
										type: "address",
									},
									{
										internalType: "address",
										name: "buyer",
										type: "address",
									},
									{
										internalType: "uint256",
										name: "price",
										type: "uint256",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType:
									"struct ISqwidMarketplace.ItemSale[]",
								name: "sales",
								type: "tuple[]",
							},
						],
						internalType: "struct ISqwidMarketplace.Item",
						name: "item",
						type: "tuple",
					},
					{
						internalType: "address payable",
						name: "owner",
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
						internalType: "uint256",
						name: "marketFee",
						type: "uint256",
					},
					{
						internalType: "enum ISqwidMarketplace.PositionState",
						name: "state",
						type: "uint8",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "minBid",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "highestBidder",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "highestBid",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.AuctionDataResponse",
						name: "auctionData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalValue",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.RaffleDataResponse",
						name: "raffleData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "loanAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "feeAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "numMinutes",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "lender",
								type: "address",
							},
						],
						internalType: "struct ISqwidMarketplace.LoanData",
						name: "loanData",
						type: "tuple",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.PositionResponse",
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
				internalType: "enum ISqwidMarketplace.PositionState",
				name: "state",
				type: "uint8",
			},
		],
		name: "fetchPositionsByState",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "positionId",
						type: "uint256",
					},
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
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "positionCount",
								type: "uint256",
							},
							{
								components: [
									{
										internalType: "address",
										name: "seller",
										type: "address",
									},
									{
										internalType: "address",
										name: "buyer",
										type: "address",
									},
									{
										internalType: "uint256",
										name: "price",
										type: "uint256",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType:
									"struct ISqwidMarketplace.ItemSale[]",
								name: "sales",
								type: "tuple[]",
							},
						],
						internalType: "struct ISqwidMarketplace.Item",
						name: "item",
						type: "tuple",
					},
					{
						internalType: "address payable",
						name: "owner",
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
						internalType: "uint256",
						name: "marketFee",
						type: "uint256",
					},
					{
						internalType: "enum ISqwidMarketplace.PositionState",
						name: "state",
						type: "uint8",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "minBid",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "highestBidder",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "highestBid",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.AuctionDataResponse",
						name: "auctionData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalValue",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "totalAddresses",
								type: "uint256",
							},
						],
						internalType:
							"struct ISqwidMarketplace.RaffleDataResponse",
						name: "raffleData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "loanAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "feeAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "numMinutes",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "address",
								name: "lender",
								type: "address",
							},
						],
						internalType: "struct ISqwidMarketplace.LoanData",
						name: "loanData",
						type: "tuple",
					},
				],
				internalType: "struct SqwidMarketplaceUtil.PositionResponse[]",
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
				internalType: "uint256",
				name: "positionId",
				type: "uint256",
			},
		],
		name: "fetchRaffleEntries",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "marketplace",
		outputs: [
			{
				internalType: "contract ISqwidMarketplace",
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
				internalType: "contract ISqwidMarketplace",
				name: "marketplace_",
				type: "address",
			},
		],
		name: "setMarketContractAddress",
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
