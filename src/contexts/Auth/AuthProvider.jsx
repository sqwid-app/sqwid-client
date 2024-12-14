import constants from "@utils/constants";
import React, { useReducer, useState } from "react";
import AuthContext from "./AuthContext";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

const AuthProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const login = authData => {
		console.log("authData", authData);
		dispatch({
			type: "LOGIN",
			payload: authData,
		});
		localStorage.setItem("auth", JSON.stringify(authData));
	};

	const logout = () => {
		localStorage.removeItem("tokens");
		localStorage.removeItem("auth");
		localStorage.removeItem(`${constants.APP_NAME.toLowerCase()}__balance`);
		dispatch({
			type: "LOGOUT",
		});
	};

	return (
		<AuthContext.Provider
			value={{
				auth: state.auth,
				token:
					typeof state.token === "string"
						? JSON.parse(state.token) &&
						  JSON.parse(state.token).find(
								user => user.address === state.auth.address
						  )?.token
						: null,
				loading: loading,
				login,
				logout,
				setLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
