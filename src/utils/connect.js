// import { Provider, Signer } from "@reef-defi/evm-provider";
// import { WsProvider, Keyring } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import { stringToHex } from '@polkadot/util';
// const WS_URL = 'wss://rpc-testnet.reefscan.com/ws';

const Init = async () => {
    await web3Enable ('Sqwid');
    return await web3Accounts();
}

const Connect = async (account) => {
	const injector = await web3FromSource (account.meta.source);

	const signRaw = injector?.signer?.signRaw;

	if (!!signRaw) {

        let res = await fetch (`/api/nonce?address=${account.address}`);
        let { nonce } = await res.json ();

        const sres = await signRaw ({
			address: account.address,
			data: stringToHex (nonce),
			type: 'bytes'
		});

        const { signature } = sres;

        res = await fetch (`/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                address: account.address,
                signature: signature
            })
        });

        let json = await res.json ();

        if (json.status === 'success') {
            console.log ('auth success');
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
        }
	}
}

export { Connect, Init };
