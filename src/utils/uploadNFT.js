import axios from "axios";

const uploadNFT = (file,name,description) => {
	const data = new FormData();
	data.append("fileData", file);
	data.append("name", name);
	data.append("description", description);
	let jwt = JSON.parse (localStorage.getItem ("tokens")).find (token => token.address = '5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA');
	axios.post (`${process.env.REACT_APP_API_URL}/api/create/collectible`, data, {
		headers: {
			'Authorization': `Bearer ${jwt.token}`,
		}
	})
	.then(res => {
		console.log(res.data)
	})
}

export { uploadNFT }