import React, { Suspense, useContext } from "react";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CollectibleProvider from "@contexts/Collectible/CollectibleProvider";
// import TopBanner from "@components/Default/TopBanner";
// Removed top banner from routes
import BreadContainer from "@components/Default/BreadContainer";
import Sac from "@pages/Sac";
import explorePages from "@routes/explorePages";
import ToS from "@pages/ToS";
import Privacy from "@pages/Privacy";
import { CollectionsSearch, UsersSearch } from "@pages/Search";
import ErrorModal from "@elements/Default/ErrorModal";
import ErrorContext from "@contexts/Error/ErrorContext";
import BrandAssets from "@pages/BrandAssets";

const Explore = React.lazy(() => import("@pages/Explore"));
const Collectible = React.lazy(() => import("@pages/Collectible"));
const Collections = React.lazy(() => import("@pages/Collections"));
const Create = React.lazy(() => import("@pages/Create"));
const Landing = React.lazy(() => import("@pages/Landing"));
const Profile = React.lazy(() => import("@pages/Profile"));
const Lagoon = React.lazy(() => import("@pages/Lagoon"));
const FeaturedDashboard = React.lazy(() => import("@pages/FeaturedDashboard"));
const NotFound = React.lazy(() => import("@pages/NotFound"));

const explorePaths = explorePages.map(item => item.path);

const Routes = () => {
	const { errorModalIsOpen, setErrorModalIsOpen, errorMessage } =
		useContext(ErrorContext);
	return (
		<Router>
			<Suspense fallback={<FullPageLoading init component="routes" />}>
				<ErrorModal
					modalIsOpen={errorModalIsOpen}
					setModalIsOpen={setErrorModalIsOpen}
					message={errorMessage}
				/>
				{/* <TopBanner /> */}
				<Switch>
					<Route path="/" exact component={Landing} />
					{explorePaths.map(path => (
						<Route
							key={path}
							path={`/explore${path}`}
							exact
							component={Explore}
						/>
					))}
					<Route
						path="/collections/:id?"
						exact
						component={Collections}
					/>
					<Route path="/profile/:id?" exact component={Profile} />
					<Route path="/create" exact component={Create} />
					<Route path="/lagoon" exact component={Lagoon} />
					<Route path="/sac/:id" exact component={Sac} />
					<Route path="/terms-of-service" exact component={ToS} />
					<Route path="/privacy-policy" exact component={Privacy} />
					<Route path="/branding" exact component={BrandAssets} />
					<Route path="/collectible/:addr/:ownerID?" exact>
						<CollectibleProvider>
							<Collectible />
						</CollectibleProvider>
					</Route>
					<Route
						path="/dashboard/featured"
						exact
						component={FeaturedDashboard}
					/>
					<Route
						path="/search/collections/:query"
						exact
						component={CollectionsSearch}
					/>
					<Route
						path="/search/users/:query"
						exact
						component={UsersSearch}
					/>
					<Route component={NotFound} />
				</Switch>
				<BreadContainer />
			</Suspense>
		</Router>
	);
};

export default Routes;
