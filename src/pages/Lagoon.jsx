import Navbar from '@components/Default/Navbar'
import Container from '@elements/Default/Container'
import FullPageLoading from '@elements/Default/FullPageLoading'
import { respondTo } from '@styles/styledMediaQuery'
import React, { Suspense } from 'react'
import styled from 'styled-components'
const HeroSection = React.lazy(() => import("@components/Lagoon/HeroSection"))

const MarginDiv = styled.div`
	margin-top: 6rem;
	${respondTo.md`
		margin-top:4rem;
	`}
`

const Wrapper = ({ children, landing }) => {
	return (
		<>
			<Navbar />
			<Container landing={landing}>
				<MarginDiv landing={landing}>
					{children}
				</MarginDiv>
			</Container>
		</>
	)
}

const Landing = () => {
	return (
		<Suspense fallback={<FullPageLoading init component="lagoon" />}>
			<Wrapper>
				<HeroSection />
			</Wrapper>
		</Suspense>
	)
}

export default Landing
