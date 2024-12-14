/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */

const slugify = string => {
	const a =
		"àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
	const b =
		"aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
	const p = new RegExp(a.split("").join("|"), "g");

	return string
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters
		.replace(/\-\-+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
};

export const truncateAddress = (addr, size = 4) =>
	`${addr.slice(0, size)}...${addr.slice(-size)}`;

export const clamp = (text, length = 128) =>
	text.length > length ? text.slice(0, ) + "..." : text;

export const sanitize = filename => slugify(filename);
export const capitalize = ([first, ...rest], locale = navigator.language) =>
	first.toLocaleUpperCase(locale) + rest.join("");
