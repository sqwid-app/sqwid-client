import jwt_decode from "jwt-decode";

export const isJWTExpired = (tokenParam=null) => {
	let token = tokenParam?tokenParam:localStorage.getItem("token");
	if(token){
		let decodedToken = jwt_decode(token);
		console.log("Decoded Token", decodedToken);
		let currentDate = new Date();
		if (decodedToken.exp * 1000 < currentDate.getTime()) {
			return true
		} else {
			return false
		}
	}
	return false
}
