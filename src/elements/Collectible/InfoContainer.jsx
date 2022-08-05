import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import PropertiesSection from "@elements/Collectible/PropertiesSection";
import useActiveTabs from "@utils/useActiveTabs";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
//eslint-disable-next-line
import BidsSection from "./BidsSection";
import DetailsSection from "./DetailsSection";
import HeartsSection from "./HeartsSection";
//eslint-disable-next-line
import HistorySection from "./HistorySection";
import InfoSection from "./InfoSection";
import MarketSection from "./MarketSection";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	height: 100%;
	/* flex:1 1 0;
	height: 100%; */
`;

const Navbar = styled.nav`
	display: flex;
	gap: 0.5rem;
	width: 100%;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select: none;
	// div {
	// 	align-self: center;
	// 	font-size: 1.1rem;
	// 	font-weight: bold;
	// 	flex: 1;
	// 	text-align: right;
	// }
	p {
		&:last-of-type {
			flex: 1;
			text-align: right;
		}
	}
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
	
	const InfoContainer = () => {
		/* PRERELEASE 🚧 */
	const { collectibleInfo } = useContext (CollectibleContext);

	const [navRoutes, setNavRoutes] = useState([
		{
			name: "Info",
			isActive: true,
			component: (
				<>
					<InfoSection />
					<PropertiesSection />
					<MarketSection />
				</>
			),
		},
		{
			name: "History",
			isActive: false,
			component: <HistorySection />
			// component: <>Work in progress ⚒🚧</>
		},
		{
			name: "Details",
			isActive: false,
			// component: <BidsSection />
			component: <DetailsSection />,
		},
		{
			name: `❤ ${collectibleInfo.hearts?.length || 0}`,
			isActive: false,
			component: <HeartsSection />
		}
	]);

	useEffect (() => {
		const newRoutes = Array.from (navRoutes);
		newRoutes[newRoutes.length - 1] = {
			...navRoutes[newRoutes.length - 1],
			name: `❤ ${collectibleInfo.hearts?.length || 0}`,
		};
		setNavRoutes (newRoutes);
		// eslint-disable-next-line
	}, [collectibleInfo.hearts]);

	const replacer = useActiveTabs({ navRoutes, setNavRoutes });

	return (
		<Container>
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
						{navRoutes.length > 1 && item.name}
					</NavContent>
				))}
				{/* <div>❤ {collectibleInfo.hearts?.length || 0}</div> */}
			</Navbar>
			{navRoutes.find(item => item.isActive).component}
		</Container>
	);
};

export default InfoContainer;
