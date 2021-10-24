import { createContext } from "react";
import { initialState } from "./initialState";
const AuthContext = createContext(initialState);

export default AuthContext;
