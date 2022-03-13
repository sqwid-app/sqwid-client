import { useContext, useEffect } from "react";
import AuthContext from "@contexts/Auth/AuthContext";
import { isJWTExpired } from "@utils/isJWTExpired";

const useCheckJWT = (id = null) => {
	const { auth, token, logout } = useContext(AuthContext);
	useEffect(() => {
		!id && auth && token && isJWTExpired(token) && logout();
	}, [token, logout, auth, id]);
};

export default useCheckJWT;
