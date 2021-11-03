import Wrapper from '@components/Default/Wrapper'
import FullPageLoading from '@elements/Default/FullPageLoading'
import React, { Suspense } from 'react'
const HeroSection = React.lazy(() => import("@components/Landing/HeroSection"))

const Landing = () => {
	return (
		<Wrapper>
			<Suspense fallback={<FullPageLoading/>}>
				<HeroSection/>
			</Suspense>
		</Wrapper>
	)
}

export default Landing
