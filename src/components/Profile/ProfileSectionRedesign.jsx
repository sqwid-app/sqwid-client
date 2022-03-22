import EditDetailsProvider from "@contexts/EditDetails/EditDetailsProvider";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Collections from "./Collections";
import { respondTo } from "@styles/styledMediaQuery";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import Select from "react-select";
import { styles } from "@styles/reactSelectStyles";
import Info from "./Info";
import AvailableSection from "@elements/ProfileRedesign/Sections/AvailableSection";
import OnSaleSection from "@elements/ProfileRedesign/Sections/OnSaleSection";
import AuctionSection from "@elements/ProfileRedesign/Sections/AuctionSection";
import RaffleSection from "@elements/ProfileRedesign/Sections/RaffleSection";
import LoanSection from "@elements/ProfileRedesign/Sections/LoanSection";
import useActiveTabs from "@utils/useActiveTabs";

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

const Title = styled.div`
	font-size: 1.8rem;
	font-weight: 900;
	align-self: flex-start;
`;

const Navbar = styled.nav`
	display: flex;
	gap: 0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select: none;
`;

const HeaderSection = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
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

const StyledSelect = styled(Select)`
	min-width: 8rem;
	z-index: 6;
	position: relative;
`;

const ProfileSection = () => {
	const [navRoutes, setNavRoutes] = useState([
		{
			name: "Info",
			isActive: true,
			title: "Profile",
			component: <Info />,
		},
		{
			name: "Collections",
			isActive: false,
			title: "Collections",
			component: <Collections />,
		},
		{
			name: "Available",
			isActive: false,
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
	return (
		<>
			<EditDetailsProvider>
				<Section>
					<HeaderSection>
						<Title>
							{navRoutes.find(item => item.isActive).title}
						</Title>
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
					</HeaderSection>
					<>{navRoutes.find(item => item.isActive).component}</>
				</Section>
			</EditDetailsProvider>
		</>
	);
};

export default ProfileSection;
