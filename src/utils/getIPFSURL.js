export const getCloudflareURL = (url) => `https://cloudflare-ipfs.com/ipfs/${url.slice(7)}`;

export const getDwebURL = (url) => {
	let [randomAssString, filename] = url.slice(7).split("/")
	return `https://${randomAssString}.ipfs.dweb.link/${filename}`
}