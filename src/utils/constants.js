const constants = {
	APP_NAME: "Sqwid",
	APP_DESCRIPTION: "An ocean of possibilities",
	APP_ABOUT:
		"%APP_NAME% seeks to create a safe and accessible environment, one in which artists can utilize the Reef blockchain to distribute their work in novel ways and forge closer bonds with their followers.",
	APP_WEBSITE: "https://sqwid.app",
	APP_SCAN_BASE_URL: "https://reefscan.com",
	SOCIAL: {
		TWITTER_HANDLE: "sqwid_app",
		GITHUB_HANDLE: "sqwid-app",
		DISCORD_CODE: "FtkZE9aK8Z",
	},
	STATE_TYPES: ["Available", "Sale", "Auction", "Raffle", "Loan"],
	STATE_EMPTY_MESSAGE_MAP: [
		'Looks like nothing\'s "Available" here 🤔',
		'Sorry pal, nothing\'s "On Sale" right now 😔',
		'This place is currently "Auctioned" away 😶',
		'This area seems to be "Raffled" off 📪',
		'This section is on "Loan" 🤩',
	],
	STATE_TYPES_KEYS: ["sale", "auction", "raffle", "loan"],
	STATE_EMOJI_MAP: {
		sale: "",
		auction: "",
		raffle: "",
		loan: "",
	},
	CREATE_ACCEPTED_MIMETYPES: [
		"image/jpeg",
		"image/png",
		"video/mp4",
		"image/webp",
		"image/gif",
	],
	DOCUMENTATION: {
		base: "https://github.com/sqwid-app/sqwid-docs",
		sale: "https://github.com/sqwid-app/sqwid-docs/blob/main/market_interaction/regular_sale.md",
		auction:
			"https://github.com/sqwid-app/sqwid-docs/blob/main/market_interaction/auction.md",
		raffle: "https://github.com/sqwid-app/sqwid-docs/blob/main/market_interaction/raffle.md",
		loan: "https://github.com/sqwid-app/sqwid-docs/blob/main/market_interaction/loan.md",
	},
	EXPLORE_PAGINATION_LIMIT: 12,
	COPY_WARNING: "Use this address only on the Reef Chain",
	OCEAN_QUOTES: [
		"Dance with the waves, move with the sea, let the rhythm of the water set your soul free - Christy Ann Martine",
		"If the ocean can calm itself, so can you. We are both salt water mixed with air - Nayyirah Waheed",
		"I have seafoam in my veins, I understand the language of waves - Le Testament d'Orphée",
		"The sea is a desert of waves, A wilderness of water - Langston Hughes",
		"But the sea which no one tends is also a garden - William Carlos Williams",
		"I will find comfort in the rhythm of the sea - Charlotte Eriksson",
		"The sea does not like to be restrained - Rick Riordan",
		"The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul - Robert Wylan",
		"Why do we love the sea? It is because it has some potent power to make us think things we like to think - Robert Henri",
		"Let the waves carry you where the light can not - Mohit Kaushik",
		"I wanted freedom, open air and adventure. I found it on the sea - Alain Gerbeault",
		"Humanity is like an ocean; if a few drops of the ocean are dirty, the ocean does not become dirty - Mahatma Gandhi",
	],
	DEFAULT_CONTRACT_STORAGE_LIMIT: 2000,
	ERROR_MAP: {
		6: {
			2: "This account does not have enough balance to execute the transaction",
		},
	},
};

export default constants;
