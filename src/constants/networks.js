export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0xB4630116Dca95650C1E56F3dD39c7edeb1075B38",
			erc1155: "0xc2F3BE4636A0a1ddf3b4D63ef22014DD41114336",
			utility: "0x30eDebE433702029C00544615aCC4E1b445939BA",
		},
		backend: "https://testnet-api.sqwid.app",
		// backend: "http://localhost:8080",
	},
	reef_mainnet: {
		rpc: "wss://rpc.reefscan.com/ws",
		contracts: {
			marketplace: "0xB13Be9656B243600C86922708C20606f5EA89218",
			erc1155: "0x0601202b75C96A61CDb9A99D4e2285E43c6e60e4",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		backend: "https://mainnet-api.sqwid.app",
		// backend: "http://localhost:8080",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "reef_testnet";
