const networks = {
    reef_testnet: {
        rpc: 'wss://rpc-testnet.reefscan.com/ws',
        contracts: {
            marketplace: '0x64c6855Ad6DFB9b9B6f700CfF231066398B46CA6',
            erc1155: '0xcBfC344bEefED6FEae98F0e2FF4af9580f601C34',
            utility: '0x5Ba166aC0F513ec08F35CfD661760Db4928b815B',
            wrapper: '0x304377e6c790347B978B6E496829011e43E43Aa2'
        }
    },
    reef_mainnet: {},
    godwoken: {}
}


export default networks;