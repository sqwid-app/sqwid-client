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

// const fetchUsersPaginated = async (searchTerm, page = 1, perPage = 10) => {
//     try {
//         const res = await axios.get (`${getBackend ()}/search/users/${searchTerm}?page=${page}&perPage=${perPage}`);
//         return res.data;
//     } catch (error) {
//         return {
//             users: [],
//             total: 0
//         }
//     }
// }

const fetchCollectionsPaginated = async (searchTerm, page = 1, perPage = 10) => {
    try {
        const res = await axios.get (`${getBackend ()}/search/collections/${searchTerm}?page=${page}&perPage=${perPage}`);
        return res.data;
    } catch (error) {
        return {
            collections: [], 
            total: 0
        }
    }
}

export {
    briefSearchAll,
    // fetchUsersPaginated,
    fetchCollectionsPaginated
}