import constants from "./constants";

const getRandomOceanQuote = () =>
	constants.OCEAN_QUOTES[
		Math.floor(Math.random() * constants.OCEAN_QUOTES.length)
	];

export default getRandomOceanQuote;
