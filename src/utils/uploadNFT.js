import axios from "axios";

const uploadNFT = async (file,name,description) => {
	const data = new FormData();
	data.append("fileData", file);
	data.append("name", name);
	data.append("description", description);
	const address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
	let jwt = address ? JSON.parse (localStorage.getItem ("tokens")).find (token => token.address = address) : null;
	if (jwt) {
		return await axios.post (`${process.env.REACT_APP_API_URL}/api/create/collectible`, data, {
			headers: {
				'Authorization': `Bearer ${jwt.token}`,
			}
		})
	} else return null;
}

export { uploadNFT }