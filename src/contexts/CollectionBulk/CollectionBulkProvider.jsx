import React, { useState } from "react";
import CollectionBulkContext from "./CollectionBulk";
import { initialState } from "./initialState";

const CollectionBulkProvider = props => {
	const [collectionBulkData, setCollectionBulkData] = useState(initialState);

	return (
		<CollectionBulkContext.Provider
			value={{
				collectionBulkData,
				setCollectionBulkData,
			}}
		>
			{props.children}
		</CollectionBulkContext.Provider>
	);
};

export default CollectionBulkProvider;
