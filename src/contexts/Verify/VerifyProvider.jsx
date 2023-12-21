import React, { useState } from "react";
import VerifyContext from "./Verify";
import { initialState } from "./initialState";

const VerifyProvider = props => {
	const [verifyData, setVerifyData] = useState(initialState);

	return (
		<VerifyContext.Provider
			value={{
				verifyData,
				setVerifyData,
			}}
		>
			{props.children}
		</VerifyContext.Provider>
	);
};

export default VerifyProvider;
