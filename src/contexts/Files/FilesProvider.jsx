import React, { useState } from "react";
import FilesContext from "./FilesContext";
import { initialState } from "./initialState";

const FilesProvider = props => {
	const [filess, setFiless] = useState(initialState.filess);
	const [filesData, setFilesData] = useState(initialState.filesData);

	return (
		<FilesContext.Provider
			value={{
				filess,
				setFiless,
				filesData,
				setFilesData,
			}}
		>
			{props.children}
		</FilesContext.Provider>
	);
};

export default FilesProvider;    
