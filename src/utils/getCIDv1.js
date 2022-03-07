import { CID } from "multiformats/cid";

export const getCIDv1 = url =>
	CID.parse(url.replace("ipfs://", "")).toV1().toString();
