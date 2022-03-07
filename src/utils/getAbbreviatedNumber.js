export const getAbbreviatedNumber = number =>
	Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(Number(number));
