import { createContext } from "react";
import { initialState } from "./initialState";

const FilterContext = createContext(initialState);

export default FilterContext;
