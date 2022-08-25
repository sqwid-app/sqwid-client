export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0x0a3F2785dBBC5F022De511AAB8846388B78009fD",
			erc1155: "0x1A511793FE92A62AF8bC41d65d8b94d4c2BD22c3",
			utility: "0x08925246669D150d5D4597D756A3C788eae2834B",
		},
		// backend: "https://testnet-api.sqwid.app",
		backend: "http://localhost:8080",
	},
	reef_mainnet: {
		rpc: "wss://rpc.reefscan.com/ws",
		contracts: {
			marketplace: "0xB13Be9656B243600C86922708C20606f5EA89218",
			erc1155: "0x0601202b75C96A61CDb9A99D4e2285E43c6e60e4",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		backend: "https://mainnet-api.sqwid.app",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "reef_testnet";
