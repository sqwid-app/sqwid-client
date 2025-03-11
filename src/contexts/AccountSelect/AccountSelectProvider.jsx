import React, { useEffect, useState } from "react";
import AccountSelectContext from "./AccountSelectContext";
import { initialState } from "./initialState";
import { Init } from "@utils/connect";

const AccountSelectProvider = props => {
	const [isSelectionActive, setIsSelectionActive] = useState(initialState);
	const [isReefSnapSelected,setIsReefSnapSelected] = useState(false);
	const [isWalletConnectSelected,setIsWalletConnectSelected] = useState(false);
	const [isWalletConnected,setIsWalletConnected] = useState(false);

	const [redirect, setRedirect] = useState("");
	const [pathConnect, setPathConnect] = useState("");

	const [currentAccounts, setCurrentAccounts] = useState(null);
	const [errorCode, setErrorCode] = useState(0);

	useEffect(()=>{
		localStorage.setItem("isWalletConnected", false);
	},[])

	const handleInit = async(path="")=>{
		setIsSelectionActive(true);
		setPathConnect(path);
	}

	useEffect(() => {
		if(isWalletConnected){
			handleInitConnectWallet(pathConnect)
		}
	}, [pathConnect,isWalletConnected])
	

	const handleInitConnectWallet = (path = "") => {
		(async () => {
			if(isWalletConnected){
				let {
					accounts,
					errorCode
				} = await Init(isReefSnapSelected,isWalletConnectSelected);
				setCurrentAccounts(accounts);
				setErrorCode(errorCode);
			}
		})();
		setRedirect(path);
	};

	return (
		<AccountSelectContext.Provider
			value={{
				isSelectionActive,
				setIsSelectionActive,
				currentAccounts,
				setCurrentAccounts,
				handleInit,
				isWalletConnected,setIsWalletConnected,
				isReefSnapSelected,setIsReefSnapSelected,
				isWalletConnectSelected,setIsWalletConnectSelected,
				errorCode,
				redirect,
			}}
		>
			{props.children}
		</AccountSelectContext.Provider>
	);
};

export default AccountSelectProvider;
