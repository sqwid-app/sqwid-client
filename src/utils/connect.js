import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import { stringToHex } from '@polkadot/util';
import axios from "axios";
// const WS_URL = 'wss://rpc-testnet.reefscan.com/ws';

const Init = async () => {
    await web3Enable ('Sqwid');
    return await web3Accounts();
}

const Connect = async (account) => {
	const injector = await web3FromSource (account.meta.source);

	const signRaw = injector?.signer?.signRaw;

    const { signer } = await Interact (account.address);

	if (!!signRaw) {
        if (!(await signer.isClaimed())) {
            console.log ("claiming");
            return {
                evmClaimed: false,
                signer
            }
        }
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/nonce?address=${account.address}`);
        let { nonce } = res.data;

        const sres = await signRaw ({
			address: account.address,
			data: stringToHex (nonce),
			type: 'bytes'
		});

        const { signature } = sres;
		try{
			res = await axios (`${process.env.REACT_APP_API_URL}/api/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify ({
					address: account.address,
					signature: signature,
                    evmAddress: await signer.getAddress (),
				})
			});
		}
		catch(err){
            // eslint-disable-next-line no-console
			console.log("err",err)
		}

        let json = res.data;

        if (json.status === 'success') {
            localStorage.removeItem ('collections');
            let jwts = localStorage.getItem ('tokens');
            jwts = jwts ? JSON.parse (jwts) : [];

            let item = jwts.find (jwt => jwt.address === account.address);
            if (item) {
                item.token = json.token;
            } else {
                jwts.push ({
                    name: account.meta.name,
                    address: account.address,
                    token: json.token
                });
            }

            localStorage.setItem ('tokens', JSON.stringify (jwts));

            return {
                evmClaimed: await signer.isClaimed (),
                signer
            }
        }
	}
}

const Interact = async (address = null) => {
    if (!address) address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
    const allInjected = await web3Enable ('Sqwid');
    const injected = allInjected[0].signer;
    const provider = new Provider ({
        provider: new WsProvider (process.env.REACT_APP_RPC_URL)
    });
    await provider.api.isReady;

    const signer = new Signer (provider, address, injected);

    return {
        signer,
        provider
    }
}


export { Connect, Init, Interact };
