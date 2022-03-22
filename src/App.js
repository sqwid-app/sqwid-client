import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { HelmetProvider } from "react-helmet-async";
import AccountSelectProvider from "@contexts/AccountSelect/AccountSelectProvider";
const Routes = React.lazy(() => import("./routes"));

const App = () => {
	return (
		<HelmetProvider>
			<AuthProvider>
				<AccountSelectProvider>
					<Suspense
						fallback={<FullPageLoading init component="app" />}
					>
						<Routes />
					</Suspense>
				</AccountSelectProvider>
			</AuthProvider>
		</HelmetProvider>
	);
};

export default App;
