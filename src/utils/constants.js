const constants = {
	APP_NAME: "Sqwid",
	APP_DESCRIPTION: "An ocean of possibilities",
	APP_ABOUT: "%APP_NAME% aims to build a new creative economy — a world where creators can use the Reef blockchain to value their work in entirely new ways, and build stronger connections with their supporters.",
	APP_WEBSITE: "https://sqwid.app",
	APP_SCAN_BASE_URL: "https://reefscan.com",
	STATE_TYPES: [
		"Available",
		"Sale",
		"Auction",
		"Raffle",
		"Loan",
	],
	STATE_EMPTY_MESSAGE_MAP: [
		"Looks like nothing's \"Available\" here 🤔",
		"Sorry pal, nothing's \"On Sale\" right now 😔",
		"This place is currently \"Auctioned\" away 😶",
		"This area seems to be \"Raffled\" off 📪",
		"This section is on \"Loan\" 🤩",
	],
	STATE_TYPES_KEYS: [
		"sale",
		"auction",
		"raffle",
		"loan"
	],
	STATE_EMOJI_MAP: {
		"sale": "💰",
		"auction": "⌛",
		"raffle": "🎲",
		"loan": "🏦"
	},
	CREATE_ACCEPTED_MIMETYPES: [
		"image/jpeg",
		"image/png",
		// "video/mp4",
	],
	EXPLORE_PAGINATION_LIMIT: 12,
}

export default constants