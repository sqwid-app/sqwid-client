import optToFixed from "./optToFixed";

export const formatReefPrice = price =>
	optToFixed(
		typeof price === Number ? price / 10 ** 18 : Number(price) / 10 ** 18
	);
