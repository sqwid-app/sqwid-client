import { createContext } from "react";
import { initialState } from "./initialState";
const ErrorContext = createContext(initialState);

export default ErrorContext;
