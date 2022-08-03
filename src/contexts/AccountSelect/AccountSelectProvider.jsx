import React, { useState } from "react";
import AccountSelectContext from "./AccountSelectContext";
import { initialState } from "./initialState";
import { Init } from "@utils/connect";

const AccountSelectProvider = props => {
	const [isSelectionActive, setIsSelectionActive] = useState(initialState);

	const [redirect, setRedirect] = useState("");

	const [currentAccounts, setCurrentAccounts] = useState(null);
	const [errorCode, setErrorCode] = useState(0);
	const handleInit = (path = "") => {
		(async () => {
			let {
				accounts,
				errorCode
			} = await Init();
			setCurrentAccounts(accounts);
			setErrorCode(errorCode);
		})();
		setIsSelectionActive(!isSelectionActive);
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
				errorCode,
				redirect,
			}}
		>
			{props.children}
		</AccountSelectContext.Provider>
	);
};

export default AccountSelectProvider;
