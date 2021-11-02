import axios from "axios";

const createCollection = async (file,name,description) => {
	const data = new FormData();
	data.append("fileData", file);
	data.append("name", name);
	data.append("description", description);
	const address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
	let jwt = address ? JSON.parse (localStorage.getItem ("tokens")).find (token => token.address = address) : null;
	if (jwt) {
		try {
			return await axios.post (`${process.env.REACT_APP_API_URL}/api/create/collection`, data, {
				headers: {
					'Authorization': `Bearer ${jwt.token}`,
				}
			});
		} catch (error) {
			// console.log (error);
		}
	} else return null;
}

export { createCollection }