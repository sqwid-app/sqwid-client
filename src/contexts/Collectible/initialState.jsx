// export const initialState = {
// 	isValidCollectible: true,
// 	title: "",
// 	description: "",
// 	creator: {
// 		name: "",
// 		id: ""
// 	},
// 	owners: {},
// 	collection: {
// 		name: "",
// 		image: "",
// 	},
// 	properties: [],
// 	contentURL: "",
// 	isOnSale: false,
// 	quantity: {},
// 	price: "",
// 	highestBid: "",
// 	bidsHistory: [],
// 	priceInUSD: "",
// 	market: {},
// 	type: ""
// }

/*
	https://res.cloudinary.com/etjfo/image/upload/v1644353786/sqwid/statesSchema.png
*/

export const initialState = {
	isValidCollectible: true,
	approved: false,
	positionId: "",
	itemId: "",
	tokenId: "",
	collection: {
		image: "",
		description: "",
		created: "",
		name: "",
		owner: "",
		id: ""
	},
	creator: {
		address: "",
		avatar: "",
		name: ""
	},
	owner: {
		address: "",
		avatar: "",
		name: ""
	},
	amount: "",
	sale: null,
	auction: null,
	raffle: null,
	loan: null,
	marketFee: "",
	state: "",
	conversionRate: 0,
	meta: {
		description: "",
		image: "",
		attributes: [],
		mimetype: "",
		media: "",
		name: ""
	}
}