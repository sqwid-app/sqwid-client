export const initialState = {
	token: localStorage.getItem("token") || null,
	auth: JSON.parse(localStorage.getItem("auth")) || null,
};
