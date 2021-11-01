import AuthContext from "@contexts/Auth/AuthContext";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 1.5rem;
	.nav-selected{
		color: var(--app-text) !important;
	}
	.nav-links{
		text-decoration: none;
		color: var(--app-container-text-primary);
		transition: color 0.25s ease;
		&:hover{
			color: var(--app-container-text-primary-hover);
		}
	}
`

const LinkGroups = () => {
	const { auth } = useContext(AuthContext)
	const isLoggedIn = auth !== null
	return (
		<LinkContainer>
			<NavLink to="/" exact className="nav-links" activeClassName="nav-selected">
				Explore
			</NavLink>
			{isLoggedIn&&(
				<>
					<NavLink to="/profile" exact className="nav-links" activeClassName="nav-selected">
						Profile
					</NavLink>
					<NavLink to="/create" exact className="nav-links" activeClassName="nav-selected">
						Create
					</NavLink>
				</>
			)}
		</LinkContainer>
	)
}

export default LinkGroups
