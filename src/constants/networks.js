export const networks = {
	reef_testnet: {
		rpc: 'wss://rpc-testnet.reefscan.com/ws',
		contracts: {
			marketplace: '0xbfe17d89845F2dCA11EE8C26e98ea59a67631Df3',
			erc1155: '0xA9EF55E0987E12F82D05A01c72b683Af43c70938',
			utility: '0x7AB030fA1953074762484167D0BA48C1bEd20CF7'
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

export const defaultNetwork = 'reef_mainnet';