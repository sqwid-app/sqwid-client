import React, { useReducer, useState } from "react";
import AuthContext from "./AuthContext";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const login = (authData) =>{
		dispatch({
			type: "LOGIN",
			payload: authData,
		});
		localStorage.setItem("auth",JSON.stringify(authData))
	}

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("auth");
		dispatch({
			type: "LOGOUT",
		});
	};


	return (
		<AuthContext.Provider
			value={{
				auth: state.auth,
				token: state.token,
				loading: loading,
				login,
				logout,
				setLoading
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
