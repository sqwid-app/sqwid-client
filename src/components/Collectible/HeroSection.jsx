import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import InfoContent from "@elements/Collectible/InfoContent";
import NFTContent from "@elements/Collectible/NFTContent";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: 75vh;
	display: grid;
	grid-template-columns: repeat(2,minmax(0,1fr));
	gap: 1rem;
`

const HeroSection = ({ addr }) => {
	const { setCollectibleInfo } = useContext(CollectibleContext);
	useEffect(() => {
		// Axios request goes here ebin...
		let infoStuff = {
			address: addr,
			title: "The Sloth",
			description: "I am not crazy! I know he swapped those numbers. I knew it was 1216. One after Magna Carta. As if I could ever make such a mistake. Never. Never! I just - I just couldn't prove it. He covered his tracks, he got that idiot at the copy shop to lie for him. You think this is something? You think this is bad? This? This chicanery? He's done worse. That billboard! Are you telling me that a man just happens to fall like that? No! *He* orchestrated it! Jimmy! He *defecated* through a *sunroof*! And I saved him! And I shouldn't have. I took him into my own firm! What was I *thinking*? He'll never change. He'll *never* change! Ever since he was 9, *always* the same! Couldn't keep his hands out of the cash drawer! But not our Jimmy! Couldn't be precious *Jimmy*! Stealing them blind! And *HE* gets to be a lawyer? What a sick joke! I should've stopped him when I had the chance!",
			creator:{
				name:"andi",
				id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
			},
			owners:[{
				name:"ratthew",
				id:"5DMKdZRQ93LqyAVt3aw8wGVADmPyUZmE8USLBkYP4QmgkgDA",
				quantity:{
					owns: 50,
					total: 50
				}
			},{
				name:"boidushya",
				id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
				quantity:{
					owns: 12,
					total: 50
				}
			},{
				name:"andi",
				id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				quantity:{
					owns: 24,
					total: 50
				}
			}],
			collection: {
				name: "sqwid moment epic",
				cover:"https://images.unsplash.com/photo-1635709045508-c07a580c97b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",
				id:"P8oUukggomsU9aG5Rx62"
			},
			properties: [{
				key:"scarcity",
				value:"common"
			},{
				key:"tag",
				value:"image"
			},{
				key:"what",
				value:"okay"
			},{
				key:"op op op oppa",
				value:"gangam style"
			}],
			contentURL: "https://images.unsplash.com/photo-1635711418987-0f129630e7b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1965&q=80",
			isOnSale: true,
			price:"1250000000.11254592",
			highestBid:"99000"
		}
		setCollectibleInfo(infoStuff)
		//eslint-disable-next-line
	}, [])
	return (
		<Wrapper>
			<InfoContent/>
			<NFTContent/>
		</Wrapper>
	)
}

export default HeroSection
