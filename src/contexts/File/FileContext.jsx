import { createContext } from "react";
import { initialState } from "./initialState";

const FileContext = createContext(initialState);

export default FileContext;
