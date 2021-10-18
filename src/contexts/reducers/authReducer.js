const initialState = {
	loading: false,
	isAuthenticated: false,
	user: null,
	userDetails: {},
};

const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === "object" && Object.keys(value).length === 0) ||
	(typeof value === "string" && value.trim().length === 0);

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SIGNUP_REQUEST":
			return {
				...state,
				loading: true,
			};
		case "SIGNUP_SUCCESSFUL":
			return {
				...state,
				loading: false,
			};
		case "SIGNUP_FAILED":
			return {
				...state,
				loading: false,
			};
		case "SET_CURRENT_USER":
			return {
				...state,
				loading: false,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case "SIGNIN_REQUEST":
			return {
				...state,
				loading: true,
			};
		case "SIGNIN_FAILED":
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}

export default authReducer
