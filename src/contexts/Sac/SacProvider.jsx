import React, { useState } from "react";
import SacContext from "./SacContext";
import { initialState } from "./initialState";

const SacProvider = props => {
	const [sacDetails, setSacDetails] = useState(initialState);

	return (
		<SacContext.Provider
			value={{
				sacDetails,
				setSacDetails,
			}}
		>
			{props.children}
		</SacContext.Provider>
	);
};

export default SacProvider;
