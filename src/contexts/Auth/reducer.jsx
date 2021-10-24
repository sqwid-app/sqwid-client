export const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				auth: action.payload.auth,
				token: action.payload.token,
			};
		case "LOGOUT":
			return {
				...state,
				token: null,
				auth: null,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
