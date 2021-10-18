import Divider from "@elements/Default/Divider";
import LinkGroups from "@elements/Navbar/LinkGroups";
import Search from "@elements/Navbar/Search";
import SignInBtn from "@elements/Navbar/SignInBtn";
import LogoIcon from "@static/svg/Logo";
import constants from "@utils/constants";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
	position:fixed;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 700;
	font-size: 1.25rem;
	padding: 2.5rem 3.75rem;
	backdrop-filter: ${props=>props.blur?`blur(5px)`:`none`};
`

const LogoContainer = styled.div`
	display: inline-block;
	align-items: center;
	font-size: 2rem;
	font-weight: 900;
	span, svg{
		vertical-align:middle;
	}
	span{
		padding-left: 0.5rem;
	}
`

const ContentContainer = styled.div`
	display: grid;
	place-items:center;
	grid-auto-flow: column;
	gap: 1rem;
`

const Navbar = () => {
	const [isAtTop, setIsAtTop] = useState(true)
	useEffect(() => {
		window.onscroll = () => {
			console.log(window.pageYOffset)
			isAtTop === true && setIsAtTop(false);
			(window.pageYOffset === 0) && setIsAtTop(true);
		}
		return () => (window.onscroll = null);
	});
	return (
		<Nav blur={!isAtTop}>
			<LogoContainer>
				<LogoIcon/>
				<span>{constants.APP_NAME}</span>
			</LogoContainer>
			<ContentContainer>
				<LinkGroups/>
				<Divider/>
				<Search/>
				<SignInBtn/>
			</ContentContainer>
		</Nav>
	)
}

export default Navbar
