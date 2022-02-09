import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
const Routes = React.lazy(() => import("./routes"))

const App = () => {
	return (
		<AuthProvider>
			<Suspense fallback={<FullPageLoading init component="app" />}>
				<Routes />
			</Suspense>
		</AuthProvider>
	)
}

export default App
