import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { HelmetProvider } from 'react-helmet-async';
const Routes = React.lazy(() => import("./routes"))

const App = () => {
	return (
		<HelmetProvider>
			<AuthProvider>
				<Suspense fallback={<FullPageLoading init component="app" />}>
					<Routes />
				</Suspense>
			</AuthProvider>
		</HelmetProvider>
	)
}

export default App
