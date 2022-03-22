import React, { useState } from "react";
import AccountSelectContext from "./AccountSelectContext";
import { initialState } from "./initialState";
import { Init } from "@utils/connect";

const AccountSelectProvider = props => {
	const [isSelectionActive, setIsSelectionActive] = useState(initialState);

	const [redirect, setRedirect] = useState("");

	const [currentAccounts, setCurrentAccounts] = useState(null);
	const handleInit = (path = "") => {
		(async () => {
			let accs = await Init();
			setCurrentAccounts(accs);
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
				redirect,
			}}
		>
			{props.children}
		</AccountSelectContext.Provider>
	);
};

export default AccountSelectProvider;
