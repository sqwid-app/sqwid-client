import axios from "axios";
import { Interact } from "./connect";
import { ethers } from "ethers";
import contractABI from "../constants/contracts/SqwidMarketplace";
import {
	isMarketplaceApproved,
	approveMarketplace,
} from "./marketplaceApproval";
import { getBackend, getContract } from "./network";
import getEVMAddress from "./getEVMAddress";

const uploadChunk = async (data, fileName, chunk, totalChunks) => {
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;

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

const createBulkCollectibles = async collectionBulkData => {
	const {
		collectionName,
		collectionDescription,
		coverFile,
		zipFile,
		royaltyRecipient,
	} = collectionBulkData;
	const copies = Number(collectionBulkData.copies) || 1;
	const royalty = (Number(collectionBulkData.royalty) || 0) * 100;

	const data = new FormData();
	data.append("collectionName", collectionName);
	data.append("collectionDescription", collectionDescription);
	data.append("coverFile", coverFile);
	data.append("zipFile", zipFile);

	console.log("data", data);
	console.log("royaltyRecipient", royaltyRecipient);
	console.log("royalty", royalty);
	console.log("copies", copies);

	return;

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
			const metadata = await axios.post(
				`${getBackend()}/create/bulk/create`,
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
					},
				}
			);

			console.log("metadata URI => ", metadata);

			// const meta = metadata.data?.metadata;
			// let { signer } = await Interact(address);
			// let to =
			// 	files.royaltyRecipient && files.royaltyRecipient !== ""
			// 		? files.royaltyRecipient
			// 		: await signer.getAddress();

			// if (to.startsWith ('5')) to = await getEVMAddress(to);

			// let contract = new ethers.Contract(
			// 	getContract("marketplace"),
			// 	contractABI,
			// 	signer
			// );
			// try {
			// 	const nft = await contract.mintBatch(
			// 		[copies],
			// 		[meta],
			// 		[file.type.split("/")[0]],
			// 		[to],
			// 		[royalty]
			// 	);
			// 	// eslint-disable-next-line
			// 	const receipt = await nft.wait();
			// 	// eslint-disable-next-line
			// 	const itemId = receipt.events[1].args["itemId"].toNumber();
			// 	// eslint-disable-next-line
			// 	const positionId = receipt.events[1].args["positionId"].toNumber();

			// 	await axios.post(
			// 		`${getBackend()}/create/collectible/verify`,
			// 		{
			// 			id: itemId,
			// 			collection: collection,
			// 		},
			// 		{
			// 			headers: {
			// 				Authorization: `Bearer ${jwt.token}`,
			// 				"Content-Type": "application/json",
			// 			},
			// 		}
			// 	);
			// 	return positionId;
			// } catch (err) {
			// 	return { error: err };
			// }
		} catch (err) {
			return { error: err };
		}
	} else return null;
};

export { createBulkCollectibles, uploadChunk };
