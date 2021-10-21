import Collections from "@pages/Collections";
import Create from "@pages/Create";
import Landing from "@pages/Landing";
import Profile from "@pages/Profile";
import React from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

const App = () => {
	return (
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
			</Switch>
		</Router>
	)
}

export default App
