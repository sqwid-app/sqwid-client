export const networks = {
	reef_testnet: {
		rpc: 'wss://rpc-testnet.reefscan.com/ws',
		contracts: {
			marketplace: '0xEde8b3844E01444a9D3E0aCDd118f97827f179A4',
			erc1155: '0x03aE38D60a5F97a747980d6EC4B1CdDAAb9F1979',
			utility: '0x7E2f35C171Ea6B96B45acBC079D391e06097a5E0'
		},
		backend: 'https://testnet-api.sqwid.app'
	},
	reef_mainnet: {
		rpc: 'wss://rpc.reefscan.com/ws',
		contracts: {
			marketplace: '0xe124E8bD72Df842189e6E0762558191f267E5E9d',
			erc1155: '0x5728847Ca5d2466dE6AcD33597D874f480acdAdB',
			utility: '0x52CD9d5B4A9a3610Bd87668B5158B7d7259CA430'
		},
		backend: 'https://mainnet-api.sqwid.app'
	}
}

export const defaultNetwork = 'reef_testnet';