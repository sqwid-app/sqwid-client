export const getAvatarFromId = id =>
	`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURI(id)}&scale=50`;
