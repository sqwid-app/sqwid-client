import React, { useState } from "react";
import CollectibleContext from "./CollectibleContext";
import { initialState } from "./initialState";

const CollectibleProvider = props => {
	const [collectibleInfo, setCollectibleInfo] = useState(initialState);

	return (
		<CollectibleContext.Provider
			value={{
				collectibleInfo,
				setCollectibleInfo,
			}}
		>
			{props.children}
		</CollectibleContext.Provider>
	);
};

export default CollectibleProvider;
