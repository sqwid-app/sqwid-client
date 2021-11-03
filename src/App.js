import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import {
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";
import FullPageLoading from "@elements/Default/FullPageLoading";
const Routes = React.lazy(() => import("./routes"))

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Suspense fallback={<FullPageLoading init/>}>
						<Routes />
					</Suspense>
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default App
