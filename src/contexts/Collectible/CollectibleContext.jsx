import { createContext } from "react";
import { initialState } from "./initialState";

const CollectibleContext = createContext(initialState);

export default CollectibleContext;
