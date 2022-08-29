import axios from "axios";
import { Interact } from "./connect";
import { ethers } from "ethers";
import contractABI from "../constants/contracts/SqwidMarketplace";
import {
	isMarketplaceApproved,
	approveMarketplace,
} from "./marketplaceApproval";
import { getBackend, getContract } from "./network";

const uploadChunk = async (data, fileName, chunk, totalChunks) => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;
	// const approved = await isMarketplaceApproved();
	// if (!approved) {
	// 	await approveMarketplace();
	// }

	if (jwt) {
		try {
			return await axios.post(
				`${getBackend()}/create/bulk/upload-chunk`,
				{ data, fileName, chunk, totalChunks },
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
						"Content-Type": "application/octet-stream",
					},
				}
			);
		} catch (err) {
			return { error: err };
		}
	} else return null;
};

const upload = async fileName => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
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
			return await axios.post(
				`${getBackend()}/create/bulk/upload`,
				{ fileName },
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
						"Content-Type": "application/json",
					},
				}
			);
		} catch (err) {
			return { error: err };
		}
	} else return null;
};

const createBulkCollectibles = async () => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
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
		// try {
		// 	const metadata = await axios.post(
		// 		`${getBackend()}/create/bulk/create`,
		// 		data,
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${jwt.token}`,
		// 			},
		// 		}
		// 	);
		// 	const meta = metadata.data?.metadata;
		// 	// const to = await signer.getAddress();
		// 	let { signer } = await Interact(address);
		// 	const to =
		// 		files.royaltyRecipient && files.royaltyRecipient !== ""
		// 			? files.royaltyRecipient
		// 			: await signer.getAddress();
		// 	let contract = new ethers.Contract(
		// 		getContract("marketplace"),
		// 		contractABI,
		// 		signer
		// 	);
		// 	try {
		// 		const nft = await contract.mint(
		// 			copies,
		// 			meta,
		// 			file.type.split("/")[0],
		// 			to,
		// 			royalty
		// 		);
		// 		// eslint-disable-next-line
		// 		const receipt = await nft.wait();
		// 		// eslint-disable-next-line
		// 		const itemId = receipt.events[1].args["itemId"].toNumber();
		// 		// eslint-disable-next-line
		// 		const positionId =
		// 			receipt.events[1].args["positionId"].toNumber();
		// 		await axios.post(
		// 			`${getBackend()}/create/collectible/verify`,
		// 			{
		// 				id: itemId,
		// 				collection: collection,
		// 			},
		// 			{
		// 				headers: {
		// 					Authorization: `Bearer ${jwt.token}`,
		// 					"Content-Type": "application/json",
		// 				},
		// 			}
		// 		);
		// 		return positionId;
		// 		// console.log (verif.status, verif.data);
		// 	} catch (err) {
		// 		// console.log (err);
		// 		// return null;
		// 		return { error: err };
		// 	}
		// } catch (err) {
		// 	return { error: err };
		// }
	} else return null;
};

export { createBulkCollectibles, uploadChunk, upload };
