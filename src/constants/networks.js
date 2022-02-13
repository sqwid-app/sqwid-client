export const networks = {
	reef_testnet: {
		rpc: 'wss://rpc-testnet.reefscan.com/ws',
		contracts: {
			marketplace: '0xbfe17d89845F2dCA11EE8C26e98ea59a67631Df3',
			erc1155: '0xA9EF55E0987E12F82D05A01c72b683Af43c70938',
			utility: '0x7AB030fA1953074762484167D0BA48C1bEd20CF7',
			wrapper: '0x304377e6c790347B978B6E496829011e43E43Aa2'
		},
		backend: 'testnet'
	},
	reef_mainnet: {
		rpc: 'wss://rpc-testnet.reefscan.com/ws',
		contracts: {
			marketplace: '0xb4a9E2655c52a523711966cd0804df697fB71A47',
			erc1155: '0x5646C5AE729b456a164414CdA57CDF41074A5478',
			utility: '0xc857bb5C1D062c465a1B3Cf8af19635cC3B8e1Bc',
			wrapper: '0x304377e6c790347B978B6E496829011e43E43Aa2'
		},
		backend: 'https://api.sqwid.app'
	}
}

export const defaultNetwork = 'reef_testnet';