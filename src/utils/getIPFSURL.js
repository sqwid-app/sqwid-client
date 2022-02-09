import { getCIDv1 } from "./getCIDv1";

export const getCloudflareURL = (url) => `https://cloudflare-ipfs.com/ipfs/${url.replace("ipfs://", "")}`;

export const getDwebURL = (url) => `https://${getCIDv1(url)}.ipfs.dweb.link/`

export const getInfuraURL = (url) => `https://${getCIDv1(url)}.ipfs.infura-ipfs.io/`;
