let ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "marketFee_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "nftContractAddress_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "ItemCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "prevValue",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newValue",
        "type": "uint256"
      }
    ],
    "name": "MarketFeeChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "MarketItemSold",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "PositionDelete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "marketFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum SqwidMarketplace.PositionState",
        "name": "state",
        "type": "uint8"
      }
    ],
    "name": "PositionUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "RoyaltiesPaid",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "addAvailableTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addressBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "createBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "createItem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minBid",
        "type": "uint256"
      }
    ],
    "name": "createItemAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "loanAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "feeAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      }
    ],
    "name": "createItemLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      }
    ],
    "name": "createItemRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyValue",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "mutableMetadata",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minBid",
        "type": "uint256"
      }
    ],
    "name": "createNewItemAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyValue",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "mutableMetadata",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "loanAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "feeAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      }
    ],
    "name": "createNewItemLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyValue",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "mutableMetadata",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "numMinutes",
        "type": "uint256"
      }
    ],
    "name": "createNewItemRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "createSale",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "endRaffle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "enterRaffle",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      }
    ],
    "name": "fetchAddressItemsCreated",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.ItemSale[]",
            "name": "sales",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "positionId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "marketFee",
                "type": "uint256"
              },
              {
                "internalType": "enum SqwidMarketplace.PositionState",
                "name": "state",
                "type": "uint8"
              }
            ],
            "internalType": "struct SqwidMarketplace.Position[]",
            "name": "positions",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct SqwidMarketplace.ItemResponse[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      }
    ],
    "name": "fetchAddressPositions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "positionId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "positionCount",
                "type": "uint256"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct SqwidMarketplace.ItemSale[]",
                "name": "sales",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct SqwidMarketplace.Item",
            "name": "item",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "marketFee",
            "type": "uint256"
          },
          {
            "internalType": "enum SqwidMarketplace.PositionState",
            "name": "state",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minBid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "highestBidder",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "highestBid",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.AuctionData",
            "name": "auctionData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalValue",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.RaffleDataResponse",
            "name": "raffleData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "numMinutes",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "internalType": "struct SqwidMarketplace.LoanData",
            "name": "loanData",
            "type": "tuple"
          }
        ],
        "internalType": "struct SqwidMarketplace.PositionResponse[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fetchAllItems",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.ItemSale[]",
            "name": "sales",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "positionId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "marketFee",
                "type": "uint256"
              },
              {
                "internalType": "enum SqwidMarketplace.PositionState",
                "name": "state",
                "type": "uint8"
              }
            ],
            "internalType": "struct SqwidMarketplace.Position[]",
            "name": "positions",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct SqwidMarketplace.ItemResponse[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "fetchItem",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.ItemSale[]",
            "name": "sales",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "positionId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "marketFee",
                "type": "uint256"
              },
              {
                "internalType": "enum SqwidMarketplace.PositionState",
                "name": "state",
                "type": "uint8"
              }
            ],
            "internalType": "struct SqwidMarketplace.Position[]",
            "name": "positions",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct SqwidMarketplace.ItemResponse",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "fetchPosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "positionId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "positionCount",
                "type": "uint256"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct SqwidMarketplace.ItemSale[]",
                "name": "sales",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct SqwidMarketplace.Item",
            "name": "item",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "marketFee",
            "type": "uint256"
          },
          {
            "internalType": "enum SqwidMarketplace.PositionState",
            "name": "state",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minBid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "highestBidder",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "highestBid",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.AuctionData",
            "name": "auctionData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalValue",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.RaffleDataResponse",
            "name": "raffleData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "numMinutes",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "internalType": "struct SqwidMarketplace.LoanData",
            "name": "loanData",
            "type": "tuple"
          }
        ],
        "internalType": "struct SqwidMarketplace.PositionResponse",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum SqwidMarketplace.PositionState",
        "name": "state",
        "type": "uint8"
      }
    ],
    "name": "fetchPositionsByState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "positionId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "positionCount",
                "type": "uint256"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct SqwidMarketplace.ItemSale[]",
                "name": "sales",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct SqwidMarketplace.Item",
            "name": "item",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "marketFee",
            "type": "uint256"
          },
          {
            "internalType": "enum SqwidMarketplace.PositionState",
            "name": "state",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minBid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "highestBidder",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "highestBid",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.AuctionData",
            "name": "auctionData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalValue",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct SqwidMarketplace.RaffleDataResponse",
            "name": "raffleData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "numMinutes",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "internalType": "struct SqwidMarketplace.LoanData",
            "name": "loanData",
            "type": "tuple"
          }
        ],
        "internalType": "struct SqwidMarketplace.PositionResponse[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "fundLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "liquidateLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "marketFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyValue",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "mutableMetadata",
        "type": "bool"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "tokenURIs",
        "type": "string[]"
      },
      {
        "internalType": "address[]",
        "name": "royaltyRecipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "royaltyValues",
        "type": "uint256[]"
      },
      {
        "internalType": "bool[]",
        "name": "mutableMetadatas",
        "type": "bool[]"
      }
    ],
    "name": "mintBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nftContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155BatchReceived",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "putItemOnSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyValue",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "mutableMetadata",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "putNewItemOnSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "marketFee_",
        "type": "uint256"
      }
    ],
    "name": "setMarketFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContractAddress_",
        "type": "address"
      }
    ],
    "name": "setNftContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "unlistLoanProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "unlistPositionOnSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;