import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useSearchParams from "./useSearchParams";

const useActiveTabs = ({ navRoutes, setNavRoutes }) => {
	const query = useSearchParams();
	const history = useHistory();
	const location = useLocation();
	const queryName = "tab";

	const tab = query.get(queryName);

	const redirectToTab = tab => {
		history.replace({
			pathname: location.pathname,
			search: `?${queryName}=${tab}`,
		});
	};
	useEffect(() => {
		if (tab) {
			if (navRoutes.map(route => route.name).includes(tab)) {
				setNavRoutes(
					navRoutes.map(route => {
						route.isActive = route.name === tab;
						return route;
					})
				);
			} else {
				history.replace(location.pathname);
			}
		}
		//eslint-disable-next-line
	}, [query]);
	return redirectToTab;
};

export default useActiveTabs;
