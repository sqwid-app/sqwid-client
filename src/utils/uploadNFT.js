import axios from "axios";

const uploadNFT = async (file, name, description, properties, cover, collection) => {
	const data = new FormData();
	data.append("fileData", file);
	data.append("coverData", cover);
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
		return await axios.post(`${process.env.REACT_APP_API_URL}/api/create/collectible`, data, {
			headers: {
				'Authorization': `Bearer ${jwt.token}`
			}
		})
	} else return null;
}

export { uploadNFT }