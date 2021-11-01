import axios from "axios";
import { Interact } from "./connect";
import { ethers } from 'ethers';
import contractABI from '../constants/contracts/SqwidERC1155';
// import getMetaById from "./getMetaById";

const createCollectible = async (files) => {
	const { file, coverFile, name, description, properties, collection } = files;
	const copies = Number (files.copies) || 1;
	const royalty = (Number (files.royalty) || 0) * 100;

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
	let jwt = address ? JSON.parse(localStorage.getItem("tokens")).find(token => token.address = address) : null;
	if (jwt) {
		const metadata = await axios.post(`${process.env.REACT_APP_API_URL}/api/create/collectible`, data, {
			headers: {
				'Authorization': `Bearer ${jwt.token}`
			}
		});
		console.log ('uploaded meta', metadata);
		const uri = metadata.data.substring (7);

		let { signer } = await Interact (address);
		const to = await signer.getAddress ();
		let contract = new ethers.Contract (
			process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS,
			contractABI,
			signer
		);

		let receipt;

		try {
			const nft = await contract.mint (to, copies, uri, to, royalty);
			receipt = await nft.wait ();
		} catch (e) {
			console.log (e);
			receipt = null;
		}
		console.log ('minted', receipt);
		const verification = await axios ({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}/api/create/collectible/db`,
			data: JSON.stringify ({
				metadata: metadata.data
			}),
			headers: {
				'Authorization': `Bearer ${jwt.token}`,
				"Content-Type": "application/json"
			}
		});
		console.log ('verified', verification.data);
		return verification.data;

	} else return null;
}

export { createCollectible };