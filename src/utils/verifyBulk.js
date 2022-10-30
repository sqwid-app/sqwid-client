import axios from "axios";
import { getBackend } from "./network";

const verifyBulk = async (jsonFile) => {
    const { collectionId, itemIds } = JSON.parse (await jsonFile.text ());
    const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;

    try {
        const res = await axios.post(
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
        return res.data;
    } catch (err) {
        return { error: err };
    }
}

export default verifyBulk;