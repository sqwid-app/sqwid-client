import Landing from "@pages/Landing";
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
			</Switch>
		</Router>
	)
}

export default App
