import Collectible from "@pages/Collectible";
import Collections from "@pages/Collections";
import Create from "@pages/Create";
import Landing from "@pages/Landing";
import Profile from "@pages/Profile";
import NotFound from "@pages/NotFound";
import { Route } from "react-router-dom"

const Routes = () => {
	return (
		<>
			<Route
				path="/"
				exact
				component={Landing}
			/>
			<Route
				path="/collections/:id?"
				exact
				component={Collections}
			/>
			<Route
				path="/profile/:id?"
				exact
				component={Profile}
			/>
			<Route
				path="/create"
				exact
				component={Create}
			/>
			<Route
				path="/collectible/:addr/:ownerID?"
				exact
				component={Collectible}
			/>
			<Route
				path="*"
				component={NotFound}
			/>
		</>
	)
}

export default Routes