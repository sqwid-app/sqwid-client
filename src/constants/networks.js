export const networks = {
	reef_testnet: {
		rpc: "wss://rpc-testnet.reefscan.com/ws",
		contracts: {
			marketplace: "0x31939DF5c6A5ac0b574EDE6E610Fd30c08788A53",
			erc1155: "0x9FdEb478A27E216f80DaEE0967dc426338eD02f2",
			utility: "0x8E7Ef6bD28cD9bDb6DBf105140958ac03EeC371A",
		},
		backend: "https://sqwid-api-testnet.reefscan.info",
		// backend: "http://localhost:80",
	},
	reef_mainnet: {
		rpc: "wss://rpc.reefscan.com/ws",
		contracts: {
			marketplace: "0xB13Be9656B243600C86922708C20606f5EA89218",
			erc1155: "0x0601202b75C96A61CDb9A99D4e2285E43c6e60e4",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		backend: "https://sqwid-api-mainnet.reefscan.info",
		// backend: "http://localhost:80",
	},
};

export const defaultNetwork =
	process.env.NETWORK || "reef_mainnet";
