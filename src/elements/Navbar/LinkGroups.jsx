import AuthContext from "@contexts/Auth/AuthContext";
//eslint-disable-next-line
import Dropdown from "@elements/Default/Dropdown";
import { respondTo } from "@styles/styledMediaQuery";
import constants from "@utils/constants";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 1.5rem;
	.nav-selected {
		color: var(--app-text) !important;
	}
	.nav-links {
		text-decoration: none;
		color: var(--app-container-text-primary);
		transition: color 0.2s ease;
		&:hover {
			color: var(--app-container-text-primary-hover);
		}
	}
	${respondTo.md`
		grid-auto-flow: row;
	`}
`;

const InfoContainer = styled.div`
	margin-top: 3rem;
	display: grid;
	font-size: 1rem;
	gap: 0.5rem;
	a {
		text-decoration: underline !important;
		text-underline-offset: 10%;
		text-decoration-thickness: 0.1rem;
	}
`;

//eslint-disable-next-line
const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`;

//eslint-disable-next-line
const DropdownContainer = styled.div``;

const LinkGroups = () => {
	//eslint-disable-next-line
	const isTabletOrMobile = useIsTabletOrMobile();
	const { auth } = useContext(AuthContext);
	const isLoggedIn = auth !== null;
	const routes = [
		{
			name: "Sales",
			link: "/explore/sales",
		},
		{
			name: "Auctions",
			link: "/explore/auctions",
		},
		{
			name: "Raffles",
			link: "/explore/raffles",
		},
		{
			name: "Loans",
			link: "/explore/loans",
		},
	];
	return (
		<LinkContainer>
			{/* PRERELEASE 🚧 */}
			{/* <DropdownContainer
				to="/explore"
				exact
				className="nav-links dropdown"
				activeClassName="nav-selected"
			>
				<StyledNavLink
					to="/explore"
					exact
				>Explore</StyledNavLink>
				{!isTabletOrMobile &&
					<Dropdown
						options={routes}
					/>
				}
			</DropdownContainer> */}
			<>
				{routes.map(route => (
					<NavLink
						key={route.link}
						to={route.link}
						exact
						className="nav-links"
						activeClassName="nav-selected"
					>
						{route.name}
					</NavLink>
				))}
			</>
			{isLoggedIn && (
				<>
					{/* <NavLink to="/lagoon" exact className="nav-links" activeClassName="nav-selected">
						Lagoon
					</NavLink> */}
					<NavLink
						to="/create"
						exact
						className="nav-links"
						activeClassName="nav-selected"
					>
						Create
					</NavLink>
				</>
			)}
			{isTabletOrMobile && (
				<InfoContainer>
					<NavLink
						to={`/terms-of-service`}
						exact
						className="nav-links"
						activeClassName="nav-selected"
					>
						Terms of Service
					</NavLink>
					<NavLink
						to={`/privacy-policy`}
						exact
						className="nav-links"
						activeClassName="nav-selected"
					>
						Privacy Policy
					</NavLink>
					<a
						href={constants.DOCUMENTATION.base}
						target="_blank"
						rel="noopener noreferrer"
						exact
						className="nav-links"
						activeClassName="nav-selected"
					>
						Documentation
					</a>
				</InfoContainer>
			)}
		</LinkContainer>
	);
};

export default LinkGroups;
