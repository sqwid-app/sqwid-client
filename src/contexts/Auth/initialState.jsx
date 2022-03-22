export const initialState = {
	token: localStorage.getItem("tokens") || null,
	auth: JSON.parse(localStorage.getItem("auth"))?.auth || null,
};
