export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0xB2871bF369ce67cc0E251b449fc21A6DbAe93c2e",
			erc1155: "0x49aC7Dc3ddCAb2e08dCb8ED1F18a0E0369515E47",
			utility: "0x74d9c321Ec73F717c53788d70357fB146B25f5C4",
		},
		// backend: "https://testnet-api.sqwid.app",
		backend: "http://localhost:8080",
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
