import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { HelmetProvider } from "react-helmet-async";
import AccountSelectProvider from "@contexts/AccountSelect/AccountSelectProvider";
import ErrorProvider from "@contexts/Error/ErrorProvider";
import constants from "@utils/constants";
import { errorParser } from "@elements/Default/ErrorModal";
import Maintenance from "@pages/Maintenance";
const Routes = React.lazy(() => import("./routes"));

const App = () => {
	errorParser("{ index: 6, error: 2, message: None }");
	const { MAINTENANCE_MODE_ACTIVE } = constants;
	return (
		<HelmetProvider>
			<ErrorProvider>
				<AuthProvider>
					<AccountSelectProvider>
						<Suspense
							fallback={<FullPageLoading init component="app" />}
						>
							{MAINTENANCE_MODE_ACTIVE ? (
								<Maintenance />
							) : (
								<Routes />
							)}
						</Suspense>
					</AccountSelectProvider>
				</AuthProvider>
			</ErrorProvider>
		</HelmetProvider>
	);
};

export default App;
