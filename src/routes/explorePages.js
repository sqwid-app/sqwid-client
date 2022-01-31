import MainPage from "@pages/Explore/MainPage";
import SalePage from "@pages/Explore/SalePage";

const pages = [
	{
		path: "",
		component: <MainPage />
	},
	{
		path: "/auctions",
		component: <>auctions</>
	},
	{
		path: "/sale",
		component: <SalePage />
	},
	{
		path: "/raffles",
		component: <>raffles</>
	},
	{
		path: "/loans",
		component: <>loans</>
	},
]

export default pages;