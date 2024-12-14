const separator = num => num?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export const numberSeparator = n =>
	typeof n === String ? separator(n) : separator(n?.toString());
