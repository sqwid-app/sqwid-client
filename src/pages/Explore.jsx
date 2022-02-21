import Wrapper from '@components/Default/Wrapper'
import FullPageLoading from '@elements/Default/FullPageLoading'
import React, { Suspense } from 'react'
const HeroSection = React.lazy(() => import("@components/ExploreRedesign/HeroSection"))

const Landing = () => {
	return (
		<Suspense fallback={<FullPageLoading init component="explore" />}>
			<Wrapper>
				<HeroSection />
			</Wrapper>
		</Suspense>
	)
}

export default Landing
