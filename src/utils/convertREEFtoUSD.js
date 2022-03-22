import axios from "axios";

export const convertREEFtoUSD = async price => {
	try {
		let res = await axios(
			"https://api.coingecko.com/api/v3/simple/price?ids=reef-finance&vs_currencies=usd"
		);
		let conversionRate = res.data["reef-finance"].usd;
		return Number(price) * Number(conversionRate);
	} catch (err) {
		return null;
	}
};
