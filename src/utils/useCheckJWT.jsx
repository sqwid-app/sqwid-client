import { useContext, useEffect } from "react";
import AuthContext from "@contexts/Auth/AuthContext";
import { isJWTExpired } from "@utils/isJWTExpired";
import { useHistory } from "react-router-dom";

const useCheckJWT = (id = null) => {
	const { auth, token, logout } = useContext(AuthContext);
	const history = useHistory();
	useEffect(() => {
		if (!id && auth && token && isJWTExpired(token)) {
			logout();
			history.push("/");
		}
		//eslint-disable-next-line
	}, [token, logout, auth, id]);
};

export default useCheckJWT;
