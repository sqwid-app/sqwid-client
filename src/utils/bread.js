import { toast } from "react-toastify";

const bread = (message) => toast.error(message)

export const wipBread =
	(text = "Work in progress ⚒🚧") => { bread(<p style={{ lineHeight: "1", fontWeight: "900", color: "var(--app-container-text-primary-hover)" }}>{text}</p>) }

export default bread