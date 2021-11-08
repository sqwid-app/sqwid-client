import axios from "axios";
import { Interact } from "./connect";
import { ethers } from 'ethers';
import contractABI from '../constants/contracts/SqwidMarketplace';
//eslint-disable-next-line
import { fetchMarketplaceItem, fetchMarketplaceItems } from "./marketplace";
import { isMarketplaceApproved, approveMarketplace } from "./marketplaceApproval";
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
	let jwt = address ? JSON.parse(localStorage.getItem("tokens")).find(token => token.address === address) : null;

	const approved = await isMarketplaceApproved ();
	if (!approved) {
		await approveMarketplace ();
	}

	// console.log ('wot');
	// const items = await fetchMarketplaceItems ();
	// console.log (items);

	//eslint-disable-next-line
	// const item = await fetchMarketplaceItem (1);

	// jwt = null;
	if (jwt) {
		try {
			const metadata = await axios.post(`${process.env.REACT_APP_API_URL}/create/collectible`, data, {
				headers: {
					'Authorization': `Bearer ${jwt.token}`
				}
			});
			const uri = metadata.data.substring (7);
			let { signer } = await Interact (address);
			const to = await signer.getAddress ();
			let contract = new ethers.Contract (
				process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS,
				contractABI,
				signer
			);
			try {
				const nft = await contract.mint (to, copies, uri, to, royalty, process.env.REACT_APP_COLLECTIBLE_CONTRACT_ADDRESS);
				// eslint-disable-next-line
				const receipt = await nft.wait ();
				const itemId = await contract.currentId ();
				return Number (itemId);
				// try {
				// 	const verification = await axios ({
				// 		method: 'get',
				// 		url: `${process.env.REACT_APP_API_URL}/create/collectible/sync`,
				// 	});
				// 	return verification.data;
				// } catch (e) {
				// 	return null;
				// }
			} catch (err) {
				return null;
			}
		} catch (err) {
			return null;
		}
	} else return null;
}

export { createCollectible };