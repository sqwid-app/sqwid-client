import { createContext } from "react";
import { initialState } from "./initialState";

const CollectionBulkContext = createContext(initialState);

export default CollectionBulkContext;
