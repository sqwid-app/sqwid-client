import { respondTo } from "@styles/styledMediaQuery";
// import { getAvatarFromId } from "@utils/getAvatarFromId";
import React, { useEffect, useState } from "react";
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
import { getInfuraURL } from "@utils/getIPFSURL";
import useActiveTabs from "@utils/useActiveTabs";
import shortenIfAddress from "@utils/shortenIfAddress";
import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import { useContext } from "react";
import FilterContext from "@contexts/Filter/FilterContext";
// import EditIcon from "@static/svg/EditIcon";
import AuthContext from "@contexts/Auth/AuthContext";
import { EditCollectionModal } from "@elements/Collectible/Modals";

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
`;

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
	span {
		max-width: 20rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	${respondTo.md`
		span{
			font-size: 1.25rem;
		}
	`}
`;

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	${respondTo.md`
		flex: 0 0 100%;
		flex-direction: row;
		align-items: center;
		justify-content:space-between;
	`}
`;

const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${respondTo.md`
		flex-wrap: wrap;
	`}
`;

const CollectionsLogo = styled.div`
	position: relative;
	height: 2.5rem;
	width: 2.5rem;
	border-radius: 1000rem;
	border: 3px solid var(--app-text);
	background-color: var(--app-background);
	background-image: url("${props => props.url && props.url}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`;

const CreatorLogo = styled(CollectionsLogo)`
	height: 1.5rem;
	width: 1.5rem;
	border: 0.125rem solid var(--app-container-text-primary-hover);
`;

const Creator = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 800;
	cursor: pointer;
	text-decoration: none;
	color: var(--app-container-text-primary-hover);
	span {
		max-width: 10rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	${respondTo.md`
		font-size: 1rem;
		color: var(--app-container-text-primary-hover);
	`}
`;
const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items: center;
`;

const StyledSelect = styled(Select)`
	min-width: 6rem;
	position: relative;
	z-index: 3;
`;

const Navbar = styled.nav`
	display: flex;
	gap: 0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select: none;
`;

const NavContent = styled.p`
	position: relative;
	padding: 0.1rem 0.5rem;
	font-weight: 900;
	color: ${props =>
		props.active ? `inherit` : `var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration: none;
	transition: all 0.2s ease;
	&:before {
		content: "";
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		position: absolute;
		border-bottom: 0.1rem solid var(--app-text);
		border-radius: 0.1rem;
		opacity: 0;
		opacity: ${props => (props.active ? `1` : `0`)};
		transition: opacity 0.1s ease;
	}
`;

const CollectionDescription = styled.div`
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
	font-weight: 700;
	width: 100%;
	padding: 0.5rem 0rem;
`;

const NavContainer = styled.div`
	${respondTo.md`
		margin: 1rem auto;
		margin-left: auto;
	`}
`;

const StatsWrapper = styled.div`
	display: flex;
	align-items: end;
	justify-content: space-evenly;
	flex-direction: row;
	gap: 0.5rem;
	${respondTo.md`
		flex-wrap: wrap;
	`}
	margin: 1rem;
`;

const StatContainer = styled.div`
	width: 7em;
	// min-width: ;
	min-width: fit-content;
	padding: 1rem;
	border: 0.15rem dashed var(--app-container-bg-primary);
	border-radius: 1rem;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	gap: 0.1rem;
	${respondTo.md`
		flex-wrap: wrap;
	`}
	flex: 1;
	margin-top: .2rem;
	margin-bottom: .2rem;
`;

const ContainerTitle = styled.div`
	background-color: var(--app-background);
	padding: .2rem;
	position: absolute;
	border-radius: 1rem;
	font-size: 1rem;
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	${respondTo.md`
		font-size: 1rem;
	`}
	margin-top: -3.5rem;
	// margin-top: 3.5rem;
	margin-left: -.75rem;
`;

const Price = styled.div`
	font-weight: 900;
	svg {
		display: inline-block;
		vertical-align: bottom;
	}
	margin: 0 auto;
`;

const ContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 0.5rem;
	${respondTo.md`
		flex-direction: column;
		align-items: center;
	`}
`;

const FilterSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 12rem;
	max-width: 12rem;
	margin-top: 0.5rem;
	gap: 0.5rem;
	${respondTo.md`
		align-items: center;
		justify-content: space-between;
	`}
	user-select: none;
	transition: all 0.2s ease;
`;

const FilterLabel = styled.label`
	width: 100%;
	font-size: .9rem;
	font-weight: 600;
	color: var(--app-container-text-primary-hover);
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	overflow: hidden;
	justify-content: space-between;
	& > span {
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const FilterItemContent = styled.div`
	display: ${props => (props.active ? `flex` : `none`)};
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	width: 100%;
	padding: 0.5rem;
	overflow: hidden;
`;

const FilterTitle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-weight: 900;
	font-size: 1rem;
	width: 100%;
	padding: 0.5rem;
	color: var(--app-container-text-primary);
	cursor: pointer;
	border-radius: 0.25rem;
	border: 0.1rem solid var(--app-container-bg-primary);
	&:hover {
		background-color: var(--app-container-bg-primary);
		color: var(--app-container-text-primary-hover);
	}
`;

const TraitsTitle = styled.div`
	font-weight: 900;
	font-size: 1.25rem;
	color: var(--app-container-text-primary-hover);
	width: 100%;
	padding: 0.5rem;
`;
const FilterCheckbox = ({ onChange, name }) => {
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked(!checked);
		onChange(name, !checked);
	}
	return (
		<FilterLabel>
			<span>{name}</span>
			<input
				onChange = {handleChange}
				checked = {checked}
				type="checkbox"
			/>
		</FilterLabel>
	);
}

const FilterItem = ({ title, options, setTraits }) => {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
	}
	const handleOption = (option, state) => {
		setTraits(title, option, state);
	}
	return (
		<>
			<FilterTitle onClick={handleClick}>
				{title}
				<span>{options.length}</span>
			</FilterTitle>
			<FilterItemContent active = {active}>
				{options.map(option => (
					<FilterCheckbox name = {option} key={option} type="checkbox" onChange={handleOption} />
				))}
			</FilterItemContent>
		</>   
	);
}

const HeroSection = ({ collectionInfo, setIsLoading, isLoading }) => {
	const [navRoutes, setNavRoutes] = useState([
		{
			name: "Available",
			isActive: true,
			title: <>Available</>,
			component: <AvailableSection />,
		},
		{
			name: "On Sale",
			isActive: false,
			title: <>On Sale</>,
			component: <OnSaleSection />,
		},
		{
			name: "Auctions",
			isActive: false,
			title: <>Auctions</>,
			component: <AuctionSection />,
		},
		{
			name: "Raffles",
			isActive: false,
			title: <>Raffles</>,
			component: <RaffleSection />,
		},
		{
			name: "Loans",
			isActive: false,
			title: <>Loans</>,
			component: <LoanSection />,
		},
	]);

	const { auth } = useContext(AuthContext);
	// eslint-disable-next-line
	const [isCollectionCreator, setIsCollectionCreator] = useState(false);

	useEffect (() => {
		if (auth && collectionInfo && collectionInfo.creator?.id === auth.evmAddress) {
			setIsCollectionCreator(true);
		}
	}, [auth, collectionInfo]);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { setFilterDetails } = useContext (FilterContext);

	const replacer = useActiveTabs({ navRoutes, setNavRoutes });

	const options = navRoutes.map(route => ({
		label: route.name,
		value: route,
	}));

	const activeElement = navRoutes.find(item => item.isActive);
	const [defaultValue, setDefaultValue] = useState({
		label: activeElement.name,
		value: activeElement,
	});

	useEffect(() => {
		const activeElement = navRoutes.find(item => item.isActive);
		setDefaultValue({
			label: activeElement.name,
			value: activeElement,
		});
	}, [navRoutes]);

	const isTabletOrMobile = useIsTabletOrMobile();

	const [traits, setTraits] = useState ([]);

	useEffect (() => {
		if (collectionInfo?.traits) {
			setTraits (Object.keys (collectionInfo?.traits).map (key => {
				return collectionInfo.traits[key].map (k => {
					return {
						trait: key,
						option: k,
						selected: false
					}
				});
			}).reduce ((prev, cur) => [...prev, ...cur], []))
		}
	} , [collectionInfo?.traits]);

	const setItemTraits = (trait, option, state) => {
		setTraits(traits.map(item => {
			if (item.trait === trait && item.option === option) {
				return {
					...item,
					selected: state
				}
			}
			return item;
		}));
	}

	useEffect (() => {
		setFilterDetails (traits);
		// eslint-disable-next-line
	} , [traits]);

	// useEffect (() => {
	// 	if (traits) {
	// 		const query = {};
	// 		traits.forEach(item => {
	// 			if (item.selected) {
	// 				if (!query[item.trait]) {
	// 					query[item.trait] = [];
	// 				}
	// 				query[item.trait].push(item.option);
	// 			}
	// 		}
	// 		);
	// 		const queryString = Object.keys(query).map(key => {
	// 			return `trait[${key}]=${query[key].join(`&trait[${key}]=`)}`;
	// 		}
	// 		).join("&");

	// 		history.replace ({
	// 			search: `?tab=${q.get ('tab')}` + '&' + queryString
	// 		})
	// 	}
	// }, [traits]);

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
									url={getInfuraURL (collectionInfo.thumb)}
								/>
								<span>{collectionInfo.name}</span>
								{/* {isCollectionCreator && <EditIcon onClick = {() => {
									setIsEditModalOpen(!isEditModalOpen);
								}}/>} */}
							</Header>
							<Creator
								to={`/profile/${collectionInfo?.creator?.id}`}
							>
								by
								<CreatorLogo
									url={collectionInfo?.creator?.thumb}
								/>
								<span>
									{shortenIfAddress(
										collectionInfo?.creator?.name   
									)}
								</span>
							</Creator>
						</HeaderContainer>
						{/* TODO: remove false once collection stats are done */}
						{true && <StatsWrapper>
							<StatContainer>
								<Price>
									<span>{numberSeparator(collectionInfo.stats?.items)}</span>
								</Price>
								<ContainerTitle>Items</ContainerTitle>
							</StatContainer>
							{/* <StatContainer>
								<Price>
									<span>{numberSeparator(collectionInfo.stats?.owners)}</span>
								</Price>
								<ContainerTitle>Owners</ContainerTitle>
							</StatContainer> */}
							<StatContainer>
								<Price>
									<span>{numberSeparator(collectionInfo.stats?.itemsSold)}</span>
								</Price>
								<ContainerTitle># of Sales</ContainerTitle>
							</StatContainer>
							<StatContainer>
								<Price>
									<ReefIcon centered size={24} />{" "}
									<span>{numberSeparator(Math.round (collectionInfo.stats?.average))}</span>
								</Price>
								<ContainerTitle>Average</ContainerTitle>
							</StatContainer>
							<StatContainer>
								<Price>
									<ReefIcon centered size={24} />{" "}
									<span>{numberSeparator(collectionInfo.stats?.volume)}</span>
								</Price>
								<ContainerTitle>Volume</ContainerTitle>
							</StatContainer>
						</StatsWrapper>
						}
					</HeaderWrapper>
					<CollectionDescription>{collectionInfo.description}</CollectionDescription>
					<NavContainer>
							{isTabletOrMobile ? (
								<StyledSelect
									options={options}
									styles={styles}
									isSearchable={false}
									value={defaultValue}
									placeholder="Select Route"
									onChange={({ value: item }) => {
										replacer(item.name);
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
												replacer(item.name);
											}}
										>
											{item.name}
										</NavContent>
									))}
								</Navbar>
							)}
						</NavContainer>
					<ContentWrapper>
						{Object.keys (collectionInfo?.traits || {}).length ? <FilterSection>
							<TraitsTitle>Traits</TraitsTitle>
							{Object.keys (collectionInfo.traits).map((item, index) => (
								<FilterItem
									key={index}
									title={item}
									options={collectionInfo.traits[item]}
									setTraits={setItemTraits}
								/>
							))}
						</FilterSection> : null }
						{navRoutes.find(item => item.isActive).component}
					</ContentWrapper>
				</Section>
			)}
			<EditCollectionModal
				isActive={isEditModalOpen}
				setIsActive={setIsEditModalOpen}
				collection={collectionInfo}
			/>
		</>
	);
};

export default HeroSection;
