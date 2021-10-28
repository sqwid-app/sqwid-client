import React, { useState } from "react";
import FileContext from "./FileContext";
import { initialState } from "./initialState";

const FileProvider = (props) => {
	const [files, setFiles] = useState(initialState.files)

	return (
		<FileContext.Provider
			value={{
				files,
				setFiles,
			}}
		>
		{props.children}
		</FileContext.Provider>
	);
};

export default FileProvider;
