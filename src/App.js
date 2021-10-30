import AuthProvider from "@contexts/Auth/AuthProvider";
import Collectible from "@pages/Collectible";
import Collections from "@pages/Collections";
import Create from "@pages/Create";
import Landing from "@pages/Landing";
import Profile from "@pages/Profile";
import NotFound from "@pages/NotFound";
import React from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Switch>
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
						path="/collectible/:slug"
						exact
						component={Collectible}
					/>
					<Route
						path="*"
						component={NotFound}
					/>
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default App
