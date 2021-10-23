import React, { useState } from "react";
import FileContext from "./FileContext";
import { initialState } from "./initialState";

const FileProvider = (props) => {

	const [files, setFiles] = useState(initialState.files)
	const [ipfsURL, setIpfsURL] = useState(initialState.ipfsURL)

	return (
		<FileContext.Provider
			value={{
				files,
				ipfsURL,
				setFiles,
				setIpfsURL
			}}
		>
		{props.children}
		</FileContext.Provider>
	);
};

export default FileProvider;
