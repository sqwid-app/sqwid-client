import React from "react";
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
	return (
		<LinkContainer>
			<NavLink to="/" className="nav-links" activeClassName="nav-selected">
				Explore
			</NavLink>
			<NavLink to="/community" className="nav-links" activeClassName="nav-selected">
				Community
			</NavLink>
			<NavLink to="/create" className="nav-links" activeClassName="nav-selected">
				Create
			</NavLink>
		</LinkContainer>
	)
}

export default LinkGroups
