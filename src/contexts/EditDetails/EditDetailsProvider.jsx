import React, { useState } from "react";
import EditDetailsContext from "./EditDetailsContext";
import { initialState } from "./initialState";

const EditDetailsProvider = (props) => {
	const [info, setInfo] = useState(initialState)

	return (
		<EditDetailsContext.Provider
			value={{
				info,
				setInfo,
			}}
		>
		{props.children}
		</EditDetailsContext.Provider>
	);
};

export default EditDetailsProvider;
