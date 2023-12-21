import { Provider, Signer } from "@reef-defi/evm-provider";
// import { WsProvider } from "@polkadot/rpc-provider";
import { WsProvider } from "@polkadot/api";
// import { options } from "@reef-defi/api";
import {
	web3Accounts,
	web3Enable,
	web3FromSource,
} from "@reef-defi/extension-dapp";
import { stringToHex } from "@reef-defi/util";
import axios from "axios";
import { getBackend, getRPC } from "./network";
// const WS_URL = 'wss://rpc-testnet.reefscan.com/ws';

let provider;

const Init = async () => {
	const extensions = await web3Enable("Sqwid");
	const accs = await web3Accounts();
	return {
		errorCode: extensions.length === 0 ? 1 : accs.length === 0 ? 2 : 0,
		accounts: accs,
	};
};

const Connect = async account => {
	const injector = await web3FromSource(account.meta.source);

	const signRaw = injector?.signer?.signRaw;

	const { signer } = await Interact(account.address);

	if (!!signRaw) {
		if (!(await signer.isClaimed())) {
			return {
				evmClaimed: false,
				signer,
			};
		}
		let res = await axios.get(
			`${getBackend()}/nonce?address=${account.address}`
		);
		let { nonce } = res.data;

		const sres = await signRaw({
			address: account.address,
			data: stringToHex(nonce),
			type: "bytes",
		});

		const { signature } = sres;
		try {
			res = await axios(`${getBackend()}/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: JSON.stringify({
					address: account.address,
					signature: signature,
					evmAddress: await signer.getAddress(),
				}),
			});
		} catch (err) {
			console.log(err);
			throw err;
		}

		let json = res.data;

		if (json.status === "success") {
			localStorage.removeItem("collections");
			let jwts = localStorage.getItem("tokens");
			jwts = jwts ? JSON.parse(jwts) : [];

			let item = jwts.find(jwt => jwt.address === account.address);
			if (item) {
				item.token = json.token;
			} else {
				jwts.push({
					name: account.meta.name,
					address: account.address,
					token: json.token,
				});
			}

			localStorage.setItem("tokens", JSON.stringify(jwts));

			return {
				evmClaimed: await signer.isClaimed(),
				signer,
			};
		}
	}
};

const Interact = async (address = null) => {
	if (!address)
		address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	const allInjected = await web3Enable("Sqwid");
	const injected = allInjected[0].signer;
	if (!provider)
		provider = new Provider({
			provider: new WsProvider(getRPC()),
			types: {
				AccountInfo: "AccountInfoWithTripleRefCount",
			},
		});
	await provider.api.isReady;

	const signer = new Signer(provider, address, injected);

	return {
		signer,
		provider,
	};
};

const GetProvider = async () => {
	if (!provider)
		provider = new Provider({
			provider: new WsProvider(getRPC()),
			types: {
				AccountInfo: "AccountInfoWithTripleRefCount",
			},
		});
	await provider.api.isReady;
	return provider;
};

export { Connect, Init, Interact, GetProvider };
