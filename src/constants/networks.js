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
			marketplace: "0xe3f2740452A860c6441456aDF86D6d0be715ae82",
			erc1155: "0xa1957161Ee6Cb6D86Ae7A9cE12A30C40Dc9F1B68",
			utility: "0xffb12A5f69AFBD58Dc49b4AE9044D8F20D131733",
		},
		backend: "https://mainnet-api.sqwid.app",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "reef_testnet";
