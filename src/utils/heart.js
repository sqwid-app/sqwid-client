import axios from "axios";
import { getBackend } from "./network";

const heart = async id => {
    const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
    //eslint-disable-next-line
    let jwt = address
        ? JSON.parse(localStorage.getItem("tokens")).find(
                token => token.address === address
            )
        : null;
    try {
        const res = await axios.post(
            `${getBackend()}/heart/${id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${jwt.token}`,
                }
            }
        );
        return res.data; 
    } catch (error) {
        // console.log(error);
        return {
            error: true,
            hearts: []
        }
    }
}

export {
    heart
}