export const getIPFSURL = (url) => {
	let [ randomAssString, filename ] = url.slice(7).split("/")
	return `https://${randomAssString}.ipfs.dweb.link/${filename}`
}