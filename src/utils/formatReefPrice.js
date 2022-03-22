export const formatReefPrice = price =>
	typeof price === Number ? price / 10 ** 18 : Number(price) / 10 ** 18;
