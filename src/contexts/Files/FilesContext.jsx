import { createContext } from "react";
import { initialState } from "./initialState";

const FilesContext = createContext(initialState);

export default FilesContext;
