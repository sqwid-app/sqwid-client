import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { HelmetProvider } from "react-helmet-async";
import AccountSelectProvider from "@contexts/AccountSelect/AccountSelectProvider";
import ErrorProvider from "@contexts/Error/ErrorProvider";
const Routes = React.lazy(() => import("./routes"));

const App = () => {
	return (
		<HelmetProvider>
			<ErrorProvider>
				<AuthProvider>
					<AccountSelectProvider>
						<Suspense
							fallback={<FullPageLoading init component="app" />}
						>
							<Routes />
						</Suspense>
					</AccountSelectProvider>
				</AuthProvider>
			</ErrorProvider>
		</HelmetProvider>
	);
};

export default App;
