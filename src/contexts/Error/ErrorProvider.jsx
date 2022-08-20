import React, { useState } from "react";
import Error from "./ErrorContext";
import { initialState } from "./initialState";

const ErrorProvider = props => {
	const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState(initialState);

	return (
		<Error.Provider
			value={{
				errorModalIsOpen,
				setErrorModalIsOpen,
				errorMessage,
				setErrorMessage,
			}}
		>
			{props.children}
		</Error.Provider>
	);
};

export default ErrorProvider;
