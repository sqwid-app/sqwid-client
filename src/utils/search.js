import axios from "axios"
import { getBackend } from "./network"

const briefSearchAll = async searchTerm => {
    try {
        const res = await axios.get (`${getBackend ()}/search/all/${searchTerm}`);
        return res.data;
    } catch (error) {
        // console.log (error);
        return {
            collections: [],
            users: []
        }
    }
}


export {
    briefSearchAll
}