const optToFixed = (value, precision = 2) =>
	Number(Number(value).toFixed(precision));

export default optToFixed;
