import { Interact } from "./connect";
import axios from "axios";
import { getBackend } from "./network";

export const getBalanceProvider = async () => {
	const { signer } = await Interact();
	return await signer.getBalance();
};

export const getBalance = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	const res = await axios(`${getBackend()}/get/marketplace/balance`, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	});
	return res.error ? 0 : Number(res.data.balance);
};
