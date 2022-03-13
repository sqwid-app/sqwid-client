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
import { create as ipfsHttpClient } from "ipfs-http-client";
// import getMetaById from "./getMetaById";

const uploadFile = async file => {
	try {
		const ipfs = ipfsHttpClient({
			host: "ipfs.infura.io",
			port: 5001,
			protocol: "https",
			apiPath: "/api/v0",
		});
		const buffer = file.arrayBuffer ? await file.arrayBuffer() : file;
		const addedFile = await ipfs.add(buffer);
		return addedFile.path;
	} catch (err) {
		// console.log (err);
	}
};
//eslint-disable-next-line
const createCollectibleOld = async files => {
	const { file, coverFile, name, description, properties, collection } =
		files;
	const copies = Number(files.copies) || 1;
	const royalty = (Number(files.royalty) || 0) * 100;

	const data = new FormData();
	data.append("fileData", file);
	data.append("coverData", coverFile);
	data.append("name", name);
	data.append("description", description);
	data.append("collection", collection);
	let props = {};
	if (properties && properties.length > 0) {
		for (let p of properties) {
			p.key.length && (props[p.key] = p.value);
		}
	}
	data.append("properties", JSON.stringify(props));
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
				`${getBackend()}/create/collectible`,
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
					},
				}
			);
			const uri = metadata.data.substring(7);
			let { signer } = await Interact(address);
			const to = await signer.getAddress();
			let contract = new ethers.Contract(
				getContract("marketplace"),
				contractABI,
				signer
			);
			try {
				const nft = await contract.mint(
					copies,
					uri,
					to,
					royalty,
					false
				);
				// eslint-disable-next-line
				const receipt = await nft.wait();
				// eslint-disable-next-line
				const itemId = receipt.events[1].args["itemId"].toNumber();
				// console.log(receipt.events);
				//eslint-disable-next-line
				const verif = await axios.post(
					`${getBackend()}/create/collectible/verify`,
					{
						id: itemId,
						collection: collection,
					},
					{
						headers: {
							Authorization: `Bearer ${jwt.token}`,
							"Content-Type": "application/json",
						},
					}
				);
				// console.log (verif.status, verif.data);
			} catch (err) {
				// console.log (err);
				// return null;
			}
		} catch (err) {
			return null;
		}
	} else return null;
};

const createCollectible = async files => {
	//eslint-disable-next-line
	const { file, coverFile, name, description, properties, collection } =
		files;
	const copies = Number(files.copies) || 1;
	const royalty = (Number(files.royalty) || 0) * 100;

	let attribs = [];
	if (properties && properties.length > 0) {
		for (let p of properties) {
			p.key.length && attribs.push({ trait_type: p.key, value: p.value });
		}
	}
	let filesToUpload = [file];
	if (coverFile) filesToUpload.push(coverFile);

	const uploaded = await Promise.all(
		filesToUpload.map(file => uploadFile(file))
	);

	let data = {
		name,
		description, // eslint-disable-next-line
		image: coverFile ? uploaded[1] : uploaded[0], // eslint-disable-next-line
		media: uploaded[0],
		attributes: attribs,
		mimetype: file.type,
	};

	let meta = await uploadFile(JSON.stringify(data));

	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	//eslint-disable-next-line
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;

	let { signer } = await Interact(address);
	const to = await signer.getAddress();
	let contract = new ethers.Contract(
		getContract("marketplace"),
		contractABI,
		signer
	);

	try {
		const approved = await isMarketplaceApproved();
		if (!approved) {
			await approveMarketplace();
		}
		const nft = await contract.mint(
			copies,
			meta,
			file.type.split("/")[0],
			to,
			royalty
		);
		// eslint-disable-next-line
		const receipt = await nft.wait();
		// eslint-disable-next-line
		const itemId = receipt.events[1].args["itemId"].toNumber();
		// eslint-disable-next-line
		const positionId = receipt.events[1].args["positionId"].toNumber();

		await axios.post(
			`${getBackend()}/create/collectible/verify`,
			{
				id: itemId,
				collection: collection,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt.token}`,
					"Content-Type": "application/json",
				},
			}
		);
		return positionId;
	} catch (err) {
		return { error: err };
	}
};

export { createCollectible };
