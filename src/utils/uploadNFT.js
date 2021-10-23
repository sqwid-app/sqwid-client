import axios from "axios";

const uploadNFT = (file,title,description) => {
	const data = new FormData()
	data.append("fileData", file)
	data.append("name", title)
	data.append("description", description)
	console.log(data)
	axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, data)
		.then(res => {
			console.log(res.data)
		})
}

export { uploadNFT }