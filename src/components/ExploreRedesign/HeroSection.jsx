import { useLocation } from "react-router-dom";

import explorePages from "@routes/explorePages";

const HeroSection = () => {
	const { pathname } = useLocation();
	const currentPage = explorePages.find(
		item => item.path === pathname.replace("/explore", "")
	);

	return <>{currentPage.component}</>;
};

export default HeroSection;
