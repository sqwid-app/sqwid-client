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
			const createRes = await axios.post(
				`${getBackend()}/create/bulk/create`,
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
					},
				}
			);

			const collectionId = createRes.data?.collectionId;
			const meta = createRes.data?.metadata;
			const mimetype = createRes.data?.mimetype;
			const numItems = createRes.data?.numItems;
			let { signer } = await Interact(address);
			let to =
				royaltyRecipient && royaltyRecipient !== ""
					? royaltyRecipient
					: await signer.getAddress();

			if (to.startsWith("5")) to = await getEVMAddress(to);

			let contract = new ethers.Contract(
				getContract("marketplace"),
				contractABI,
				signer
			);

			const copiesArray = [];
			const metaArray = [];
			const mimetypeArray = [];
			const toArray = [];
			const royaltyArray = [];

			for (let i = 0; i < numItems; i++) {
				copiesArray.push(copies);
				metaArray.push(
					`${meta}/${(i + 1).toString(16).padStart(64, "0")}.json`
				);
				mimetypeArray.push(mimetype);
				toArray.push(to);
				royaltyArray.push(royalty);
			}

			try {
				const nfts = await contract.mintBatch(
					copiesArray,
					metaArray,
					mimetypeArray,
					toArray,
					royaltyArray
				);
				// eslint-disable-next-line
				const receipt = await nfts.wait();

				const itemIds = [];
				for (let i = 1; i < receipt.events.length; i += 2) {
					// eslint-disable-next-line
					itemIds.push(receipt.events[i].args["itemId"].toNumber());
				}

				await axios.post(
					`${getBackend()}/create/bulk/verify`,
					{
						itemIds,
						collectionId,
					},
					{
						headers: {
							Authorization: `Bearer ${jwt.token}`,
							"Content-Type": "application/json",
						},
					}
				);
				return collectionId;
			} catch (err) {
				return { error: err };
			}
		} catch (err) {
			return { error: err };
		}
	} else return null;
};

export { createBulkCollectibles, uploadChunk };
