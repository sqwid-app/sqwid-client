import React, { useState } from "react";
import FileContext from "./FileContext";
import { initialState } from "./initialState";

const FileProvider = props => {
	const [files, setFiles] = useState(initialState.files);
	const [fileData, setFileData] = useState(initialState.fileData);

	return (
		<FileContext.Provider
			value={{
				files,
				setFiles,
				fileData,
				setFileData,
			}}
		>
			{props.children}
		</FileContext.Provider>
	);
};

export default FileProvider;
