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
			marketplace: "0xe3f2740452A860c6441456aDF86D6d0be715ae82",
			erc1155: "0xa1957161Ee6Cb6D86Ae7A9cE12A30C40Dc9F1B68",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		backend: "https://mainnet-api.sqwid.app",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "reef_testnet";
