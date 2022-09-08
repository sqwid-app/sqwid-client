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
import bread from "./bread";

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

const buildCall = (contract, copies, to, royalty, meta, start, end) => {
	const copiesArray = [];
	const metaArray = [];
	const mimetypeArray = [];
	const toArray = [];
	const royaltyArray = [];
	for (let i = start; i < end; i++) {
		copiesArray.push(copies);
		metaArray.push(
			`${meta}/${(i + 1).toString(16).padStart(64, "0")}.json`
		);
		mimetypeArray.push("image");
		toArray.push(to);
		royaltyArray.push(royalty);
	}
	return contract.mintBatch(
		copiesArray,
		metaArray,
		mimetypeArray,
		toArray,
		royaltyArray
	);
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

	// // TODO remove
	// let { signer } = await Interact(address);
	// const receipt = (
	// 	await buildCall(
	// 		new ethers.Contract(
	// 			getContract("marketplace"),
	// 			contractABI,
	// 			signer
	// 		),
	// 		copies,
	// 		await signer.getAddress(),
	// 		royalty,
	// 		"ipfs://test",
	// 		"image",
	// 		0,
	// 		99
	// 	)
	// ).wait();
	// console.log(receipt);
	// debugger;

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

			const MAX_ITEMS_PER_TX = 30;
			const txs = [];
			bread(
				`You need to sign a total of ${Math.ceil(
					numItems / MAX_ITEMS_PER_TX
				)} transactions.`
			);

			try {
				for (let i = 0; i < numItems; i += MAX_ITEMS_PER_TX) {
					txs.push(
						(
							await buildCall(
								contract,
								copies,
								to,
								royalty,
								meta,
								i,
								Math.min(numItems, i + MAX_ITEMS_PER_TX)
							)
						).wait()
					);
				}

				const receipts = await Promise.all(txs);

				const itemIds = [];
				for (let iRec = 0; iRec < receipts.length; iRec++) {
					for (
						let iEv = 1;
						iEv < receipts[iRec].events.length;
						iEv += 2
					) {
						// eslint-disable-next-line
						itemIds.push(
							receipts[iRec].events[iEv].args["itemId"].toNumber()
						);
					}
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
