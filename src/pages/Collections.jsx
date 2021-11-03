import React,{ Suspense } from "react";
import { useParams } from "react-router";
const HeroSection = React.lazy(() => import("@components/Collections/HeroSection"))

const Collections = () => {
	const { id } = useParams()
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HeroSection id={id}/>
		</Suspense>
	)
}

export default Collections
