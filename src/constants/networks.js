export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0x614b7B6382524C32dDF4ff1f4187Bc0BAAC1ed11",
			erc1155: "0x9b9a32c56c8F5C131000Acb420734882Cc601d39",
			utility: "0xEf1c5ad26cE1B42315113C3561B4b2abA0Ba64B3",
		},
		// backend: "https://sqwid-api-testnet.reefscan.info",
		backend: "http://localhost:8080",
	},
	reef_mainnet: {
		rpc: "wss://rpc.reefscan.com/ws",
		contracts: {
			marketplace: "0xB13Be9656B243600C86922708C20606f5EA89218",
			erc1155: "0x0601202b75C96A61CDb9A99D4e2285E43c6e60e4",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		// backend: "https://sqwid-api-mainnet.reefscan.info",
		backend: "http://localhost:8080",
	},
};

export const defaultNetwork = process.env.NETWORK || "reef_testnet";
