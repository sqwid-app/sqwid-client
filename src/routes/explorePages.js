import AuctionPage from "@pages/Explore/AuctionPage";
import LoanPage from "@pages/Explore/LoanPage";
import MainPage from "@pages/Explore/MainPage";
import RafflePage from "@pages/Explore/RafflePage";
import SalePage from "@pages/Explore/SalePage";

const pages = [
	{
		path: "",
		component: <MainPage />,
	},
	{
		path: "/auctions",
		component: <AuctionPage />,
	},
	{
		path: "/sales",
		component: <SalePage />,
	},
	{
		path: "/raffles",
		component: <RafflePage />,
	},
	{
		path: "/loans",
		component: <LoanPage />,
	},
];

export default pages;
