import PropertiesSection from "@elements/Collectible/PropertiesSection";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import BidsSection from "./BidsSection";
import InfoSection from "./InfoSection";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex:1 1 0;
	height: 100%;
`

const Navbar = styled.nav`
	display:flex;
	gap:0.5rem;
	width: 100%;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select:none;
`

const activeBorder = css`
	border-bottom: 0.1rem solid var(--app-text);
	border-radius: 0.1rem;
`

const NavContent = styled.p`
	position:relative;
	padding: 0.1rem 0.5rem;
	font-weight: 900;
	color: ${props=>props.active?`inherit`:`var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration:none;
	&:before{
		content: "";
		height: 100%;
		width: 100%;
		left:0;
		top: 0;
		position: absolute;
		${props=>props.active&&activeBorder};
	}
`

const InfoContainer = () => {
	const [navRoutes, setNavRoutes] = useState([{
		name: "Info",
		isActive: true,
		component: (
			<>
				<InfoSection/>
				<PropertiesSection/>
			</>
		)
	},{
		name: "Bids",
		isActive: false,
		component: <BidsSection/>
	}])
	return (
		<Container>
			<Navbar>
				{navRoutes.map((item,index)=>(
					<NavContent
						key={index}
						active={item.isActive}
						disabled={item.isActive}
						onClick = {()=>{
							if(!item.isActive){
								let newVal = [...navRoutes.map(a=>({...a,isActive:false}))]
								newVal[index].isActive = true
								setNavRoutes(newVal)
							}
						}}
					>{item.name}</NavContent>
				))}
			</Navbar>
			{navRoutes.find(item=>item.isActive).component}
		</Container>
	)
}

export default InfoContainer
