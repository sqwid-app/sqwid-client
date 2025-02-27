import { Provider, Signer } from "@reef-defi/evm-provider";
// import { WsProvider } from "@polkadot/rpc-provider";
import { WsProvider } from "@polkadot/api";
// import { options } from "@reef-defi/api";
import { stringToHex } from "@reef-defi/util";
import axios from "axios";
import { getBackend, getRPC } from "./network";
// const WS_URL = 'wss://rpc-testnet.reefscan.com/ws';
import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";
import {extension} from "@reef-chain/util-lib";

const firebaseConfig = {
	apiKey: "AIzaSyDUrFraLlFQy4xuXRoFSCIizXY8agQgs4s",
	authDomain: "sqwid-dapp-mainnet.firebaseapp.com",
	projectId: "sqwid-dapp-mainnet",
	storageBucket: "sqwid-dapp-mainnet.firebasestorage.app",
	messagingSenderId: "665654784459",
	appId: "1:665654784459:web:2f2a075b95c70b8e7b464e",
	measurementId: "G-V3RFYG5NJX"
  };


let provider;

const Init = async (isReefSnap=false) => {
	const extensions = isReefSnap? await extension.web3Enable("Sqwid",undefined,true):await extension.web3Enable("Sqwid");
	const accs = await extension.web3Accounts();
	return {
		errorCode: extensions.length === 0 ? 1 : accs.length === 0 ? 2 : 0,
		accounts: accs,
	};
};

const Connect = async account => {
	const injector = await extension.web3FromSource(account.meta.source);

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
			if(res.data.status=="success"){
				  const app = initializeApp(firebaseConfig);
				  const analytics = getAnalytics(app);

				var event = {
					type:"user_logged_in",
					address:account.address,
					timestamp:new Date()
				}

				logEvent(analytics, "user_logged_in", event);

			}
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
	const isReefSnap = JSON.parse(localStorage.getItem("isWalletConnected"));
	const allInjected = isReefSnap? await extension.web3Enable("Sqwid",undefined,true):await extension.web3Enable("Sqwid");
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
