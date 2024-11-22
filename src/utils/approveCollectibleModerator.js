import axios from "axios";
import { Interact } from "./connect";
import { ethers } from "ethers";
import contractABI from "../constants/contracts/SqwidMarketplace";
//eslint-disable-next-line
import { fetchMarketplaceItem, fetchMarketplaceItems } from "./marketplace";
import {
	isMarketplaceApproved,
	approveMarketplace,
} from "./marketplaceApproval";
import { getBackend, getContract } from "./network";
import getEVMAddress from "./getEVMAddress";
import { web3FromSource } from "@reef-defi/extension-dapp";
import { stringToHex } from "@reef-defi/util";

const approveCollectibleByModerator = async (itemId,collectionId) => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	if (!address) {
		throw new Error("You need to login first");
	  }
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	const approved = await isMarketplaceApproved();
	if (!approved) {
		await approveMarketplace();
	}


	if (jwt) {
		try {
			let { signer } = await Interact(address);

	const injector = await web3FromSource('reef');

	const signRaw = injector?.signer?.signRaw;

	const sres = await signRaw({
		address: address,
		data: stringToHex("verify-moderator"),
		type: "bytes",
	});

	const evmAddress = await signer.queryEvmAddress();

	const { signature } = sres;
					
			try {
				const response = await axios.post(
					`${getBackend()}/edit/moderators`,
					{
						itemId,collectionId,moderatorSignature:signature,moderatorAddress:evmAddress,address
					},
					{
						headers: {
							Authorization: `Bearer ${jwt.token}`,
							"Content-Type": "application/json",
						},
					}
				);
				if (response.data.data === true) {
					window.location.reload();
					return null;
				} else {
					return { error: response.data.error || 'Unknown error occurred' };
				}
			} catch (err) {
				return { error: err };
			}
		} catch (err) {
			return { error: err };
		}
	} else return null;
};

export { approveCollectibleByModerator };
