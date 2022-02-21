import { respondTo } from "@styles/styledMediaQuery";
// import { getAvatarFromId } from "@utils/getAvatarFromId";
import React, { useState } from "react";
import styled from "styled-components";
import LoadingIcon from "@static/svg/LoadingIcon";
import { Link } from "react-router-dom";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import AvailableSection from "@elements/Collections/Sections/AvailableSection";
import OnSaleSection from "@elements/Collections/Sections/OnSaleSection";
import AuctionSection from "@elements/Collections/Sections/AuctionSection";
import RaffleSection from "@elements/Collections/Sections/RaffleSection";
import LoanSection from "@elements/Collections/Sections/LoanSection";
import Select from "react-select";
import { styles } from "@styles/reactSelectStyles";
import { getCloudflareURL } from "@utils/getIPFSURL";

const Section = styled.section`
	padding: 0 6rem;
	height: calc(100vh - 12rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	${respondTo.md`
		padding: 0 2rem;
		text-align: center;
	`}
`


const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
	${respondTo.md`
		span{
			font-size: 1.25rem;
		}
	`}
`

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	${respondTo.md`
		flex: 0 0 100%;
	`}
`

const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${respondTo.md`
		flex-wrap: wrap;
	`}
`

const CollectionsLogo = styled.div`
	position:relative;
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 3px solid var(--app-text);
	background-color: var(--app-background);
	background-image: url('${props => props.url && props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const CreatorLogo = styled(CollectionsLogo)`
	height: 1.5rem;
	width: 1.5rem;
	border: 0.125rem solid var(--app-text);
`

const Creator = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 800;
	cursor: pointer;
	text-decoration: none;
	color: var(--app-text);
	${respondTo.md`
		font-size: 1rem;
		color: var(--app-container-text-primary-hover);
	`}
`
const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`

const StyledSelect = styled(Select)`
	min-width: 6rem;
	position: relative;
	z-index: 3;
`

const Navbar = styled.nav`
	display:flex;
	gap:0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select:none;
`

const NavContent = styled.p`
	position:relative;
	padding: 0.1rem 0.5rem;
	font-weight: 900;
	color: ${props => props.active ? `inherit` : `var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration:none;
	transition: all 0.2s ease;
	&:before{
		content: "";
		height: 100%;
		width: 100%;
		left:0;
		top: 0;
		position: absolute;
		border-bottom: 0.1rem solid var(--app-text);
		border-radius: 0.1rem;
		opacity: 0;
		opacity: ${props => props.active ? `1` : `0`};
		transition: opacity 0.1s ease;
	}
`

const NavContainer = styled.div`
	${respondTo.md`
		margin: 1rem 0;
		margin-left: auto;
	`}
`

const HeroSection = ({ collectionInfo, setIsLoading, isLoading }) => {

	const [navRoutes, setNavRoutes] = useState([{
		name: "Available",
		isActive: true,
		title: <>Available <span className="emoji">🐋</span></>,
		component: <AvailableSection />
	}, {
		name: "On Sale",
		isActive: false,
		title: <>On Sale <span className="emoji">📃</span></>,
		component: <OnSaleSection />
	}, {
		name: "Auctions",
		isActive: false,
		title: <>Auctions <span className="emoji">⌛</span></>,
		component: <AuctionSection />
	}, {
		name: "Raffles",
		isActive: false,
		title: <>Raffles <span className="emoji">🎲</span></>,
		component: <RaffleSection />
	}, {
		name: "Loans",
		isActive: false,
		title: <>Loans <span className="emoji">🏦</span></>,
		component: <LoanSection />
	}])
	const options = navRoutes.map(route => ({
		label: route.name,
		value: route,
	}))
	const isTabletOrMobile = useIsTabletOrMobile();

	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Section>
					<HeaderWrapper>
						<HeaderContainer>
							<Header>
								<CollectionsLogo
									title={collectionInfo.name}
									url={getCloudflareURL(collectionInfo.thumb)}
								/>
								<span>{collectionInfo.name}</span>
							</Header>
							<Creator
								to={`/profile/${collectionInfo.creator.id}`}
							>
								by
								<CreatorLogo
									url={collectionInfo.creator.thumb}
								/>
								{collectionInfo.creator.name}
							</Creator>
						</HeaderContainer>
						<NavContainer>
							{isTabletOrMobile ? (
								<StyledSelect
									options={options}
									styles={styles}
									isSearchable={false}
									defaultValue={options[0]}
									placeholder="Select Route"
									onChange={({ value: item }) => {
										if (!item.isActive) {
											let newVal = [...navRoutes.map(a => ({ ...a, isActive: false }))]
											newVal.find(e => e.name === item.name).isActive = true
											setNavRoutes(newVal)
										}
									}}
								/>
							) : (
								<Navbar>
									{navRoutes.map((item, index) => (
										<NavContent
											key={index}
											active={item.isActive}
											disabled={item.isActive}
											onClick={() => {
												if (!item.isActive) {
													let newVal = [...navRoutes.map(a => ({ ...a, isActive: false }))]
													newVal[index].isActive = true
													setNavRoutes(newVal)
												}
											}}
										>{item.name}</NavContent>
									))}
								</Navbar>
							)}
						</NavContainer>
					</HeaderWrapper>
					<>
						{navRoutes.find(item => item.isActive).component}
					</>
				</Section>
			)
			}
		</>
	)
}

export default HeroSection
