import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { initialState } from "./initialState";

const FilterProvider = props => {
	const [filterDetails, setFilterDetails] = useState(initialState);

	return (
		<FilterContext.Provider
			value={{
				filterDetails,
				setFilterDetails,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};

export default FilterProvider;
