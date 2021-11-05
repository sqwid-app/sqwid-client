import { getAvatarFromId } from "@utils/getAvatarFromId";
import React, { Suspense } from "react";
import styled from "styled-components";
const Card = React.lazy(()=>import("@elements/Default/Card"));

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
`

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const SectionContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill,minmax(0,16rem));
	width: 100%;
	justify-content: space-around;
	padding: 1rem 1.25rem;
	grid-gap: 2rem 1rem;
`

const CollectionsLogo = styled.div`
	position:relative;
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 3px solid var(--app-text);
	background-color: var(--app-background);
	background-image: url('${props=>props.url&&props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const CreatorLogo = styled(CollectionsLogo)`
	height: 1.5rem;
	width: 1.5rem;
	border: 2px solid var(--app-text);
`

const Creator = styled.a`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 900;
	cursor: pointer;
	text-decoration: none;
	color: var(--app-text);
`

const HeroSection = ({ id }) => {
	const cardContent = [{
		id:"1",
		name: "The POG",
		collection : {
			thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
			name: "Sqwid Collection",
			id:"123"
		},
		owner:{
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			name: "Boidushya",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			others:10,
		},
		creator:{
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			name: "Andi",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
		},
		media:{
			url:"https://images.unsplash.com/photo-1635944095210-23114a1fb7c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			type:"image/jpeg"
		},
		price:"1000",
		highestBid:"900",
		quantity:{
			available:"10",
			total:"24"
		}
	},{
		id:"1",
		name: "The POG",
		collection : {
			thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
			name: "Sqwid Collection",
			id:"123"
		},
		owner:{
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			name: "Boidushya",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			others:10,
		},
		creator:{
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			name: "Andi",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
		},
		media:{
			url:"https://images.unsplash.com/photo-1635954641242-cb2a356a0e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			type:"image/jpeg"
		},
		price:"1000",
		highestBid:"900",
		quantity:{
			available:"10",
			total:"24"
		}
	},{
		id:"1",
		name: "1261",
		collection : {
			thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
			name: "Sqwid Collection",
			id:"123"
		},
		owner:{
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			name: "Boidushya",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			others:10,
		},
		creator:{
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			name: "Andi",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
		},
		media:{
			url:"https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			type:"image/jpeg"
		},
		price:"1000",
		highestBid:"900",
		quantity:{
			available:"10",
			total:"24"
		}
	},{
		id:"1",
		name: "The POG",
		collection : {
			thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
			name: "Sqwid Collection",
			id:"123"
		},
		owner:{
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			name: "Boidushya",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			others:10,
		},
		creator:{
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			name: "Andi",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
		},
		media:{
			url:"https://images.unsplash.com/photo-1635910160061-4b688344bd20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			type:"image/jpeg"
		},
		price:"1000",
		highestBid:"900",
		quantity:{
			available:"10",
			total:"24"
		}
	},{
		id:"1",
		name: "The POG",
		collection : {
			thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
			name: "Sqwid Collection",
			id:"123"
		},
		owner:{
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			name: "Boidushya",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			others:10,
		},
		creator:{
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			name: "Andi",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
		},
		media:{
			url:"https://images.unsplash.com/photo-1635372885681-0e0915d7b44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			type:"image/jpeg"
		},
		price:"1000",
		highestBid:"900",
		quantity:{
			available:"10",
			total:"24"
		}
	}]
	const collectionsInfo = {
		name:"Sqwid Originals",
		creator: {
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
			name:"Boidushya",
			thumb: getAvatarFromId("5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"),
		},
		thumb:"https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
		content: cardContent
	}
	return (
		<Wrapper>
			<HeaderContainer>
				<Header>
					<CollectionsLogo
						url={collectionsInfo.thumb}
					/>
					{collectionsInfo.name}
				</Header>
				<Creator
					href={`${window.location.origin}/profile/${collectionsInfo.creator.id}`}
				>
					by
					<CreatorLogo
						url = {collectionsInfo.creator.thumb}
					/>
					{collectionsInfo.creator.name}
				</Creator>
			</HeaderContainer>
			<SectionContainer>
				<Suspense>
					{collectionsInfo.content.map((item,index)=>(
						<Card
							key={index}
							data={item}
							collections
						/>
					))}
				</Suspense>
			</SectionContainer>
		</Wrapper>
	)
}

export default HeroSection
