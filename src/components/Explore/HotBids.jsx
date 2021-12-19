import React, { Suspense } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
const Card = React.lazy(()=>import("@elements/Default/Card"));

const Container = styled.div`
	width: 100%;
`

const Header = styled.h1`
	font-weight: 900;
`

const HotBids = ({ items }) => {

	// const cardContent = [{
	// 	id:"1",
	// 	name: "The NFT",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"https://images.unsplash.com/photo-1635944095210-23114a1fb7c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	// 		type:"image/jpeg"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// },{
	// 	id:"1",
	// 	name: "The NFT",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"https://images.unsplash.com/photo-1635954641242-cb2a356a0e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	// 		type:"image/jpeg"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// },{
	// 	id:"1",
	// 	name: "1261",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	// 		type:"image/jpeg"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// },{
	// 	id:"1",
	// 	name: "The NFT",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
	// 		type:"video/mp4"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// },{
	// 	id:"1",
	// 	name: "The NFT",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"https://images.unsplash.com/photo-1635372885681-0e0915d7b44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	// 		type:"image/jpeg"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// },{
	// 	id:"1",
	// 	name: "Bnnuy",
	// 	collection : {
	// 		thumb: "https://images.unsplash.com/photo-1635924941939-2b58521c61fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=263&q=80",
	// 		name: "Sqwid Collection",
	// 		id:"123"
	// 	},
	// 	owner:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
	// 		name: "Boidushya",
	// 		id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
	// 		others:10,
	// 	},
	// 	creator:{
	// 		thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
	// 		name: "Andi",
	// 		id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
	// 	},
	// 	media:{
	// 		url:"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	// 		type:"image/jpeg"
	// 	},
	// 	price:"1000",
	// 	highestBid:"900",
	// 	quantity:{
	// 		available:"10",
	// 		total:"24"
	// 	}
	// }]

	// let cards = [];
	// console.log (items);

	return (
		<Container>
			<Header>Hot Bids <span className="emoji">🔥</span></Header>
			<CardSectionContainer>
				<Suspense>
					{items.map((item,index)=>(
						<Card
							key={index}
							data={item}
						/>
					))}
				</Suspense>
			</CardSectionContainer>
		</Container>
	)
}

export default HotBids
