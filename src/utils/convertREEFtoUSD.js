import { REEF_PRICE_COINGECKO, REEF_PRICE_REEFSCAN } from "@constants/price";
import axios from "axios";

export const convertREEFtoUSD = async price => {
	try {
		let res = await axios(REEF_PRICE_REEFSCAN);
		let conversionRate = res.data["usd"] ?? 0;
		if (conversionRate !== 0) {
			return Number(price) * Number(conversionRate);
		}
	} catch (err) {
		try {
			let res = await axios(REEF_PRICE_COINGECKO);
			let conversionRate = res.data["reef"].usd ?? 0;
			return Number(price) * Number(conversionRate);
		} catch (error) {
			return 0;
		}
	}
};
