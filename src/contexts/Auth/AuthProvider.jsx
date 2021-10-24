import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

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
				login,
				logout,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
