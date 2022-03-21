export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0xd3202Ee6077C7cc25eAea3aE11bec2cD731D19FC",
			erc1155: "0x49aC7Dc3ddCAb2e08dCb8ED1F18a0E0369515E47",
			utility: "0x08925246669D150d5D4597D756A3C788eae2834B",
		},
		backend: "https://testnet-api.sqwid.app",
		// backend: "http://localhost:8080",
	},
	reef_mainnet: {
		rpc: "wss://rpc.reefscan.com/ws",
		contracts: {
			marketplace: "0xe124E8bD72Df842189e6E0762558191f267E5E9d",
			erc1155: "0x5728847Ca5d2466dE6AcD33597D874f480acdAdB",
			utility: "0x52CD9d5B4A9a3610Bd87668B5158B7d7259CA430",
		},
		backend: "https://mainnet-api.sqwid.app",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "reef_testnet";
