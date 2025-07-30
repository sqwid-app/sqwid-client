import { truncateAddress } from "./textUtils";

const shortenIfAddress = (name) => name && name.length === 42 && name.startsWith("0x") ? truncateAddress(name) : name;


export default shortenIfAddress;
