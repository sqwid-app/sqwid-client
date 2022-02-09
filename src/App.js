import React, { Suspense } from "react";
import AuthProvider from "@contexts/Auth/AuthProvider";
import FullPageLoading from "@elements/Default/FullPageLoading";
import Helmet from "react-helmet";
const Routes = React.lazy(() => import("./routes"))

const MetaTags = () => {
	return (
		<Helmet>
			<title>Sqwid – An ocean of possibilities</title>
			<meta name="title" content="Sqwid – An ocean of possibilities" />
			<meta name="description"
				content="Sqwid is an NFT marketplace running on the Reef chain that features per-item customizable royalties." />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://sqwid.app/" />
			<meta property="og:title" content="Sqwid – An ocean of possibilities" />
			<meta property="og:description" content="Sqwid is an NFT marketplace running on the Reef chain that features per-item customizable royalties." />
			<meta property="og:site_name" content="Sqwid" />
			<meta property="og:image" content="https://sqwid.app/landing.png" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://sqwid.app/" />
			<meta property="twitter:title" content="Sqwid – An ocean of possibilities" />
			<meta property="twitter:description" content="Sqwid is an NFT marketplace running on the Reef chain that features per-item customizable royalties." />
			<meta property="twitter:image" content="https://sqwid.app/landing.png" />
		</Helmet>
	)
}


const App = () => {
	return (
		<AuthProvider>
			<MetaTags />
			<Suspense fallback={<FullPageLoading init component="app" />}>
				<Routes />
			</Suspense>
		</AuthProvider>
	)
}

export default App
