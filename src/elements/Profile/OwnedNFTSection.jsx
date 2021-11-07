import Card from "@elements/Default/Card";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import { Suspense } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	position: relative;
	margin-top: 9.5rem;
	padding: 0 6rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	flex:1;
	${respondTo.md`
		margin-top: 2rem;
		padding: 0 2rem;
	`}
`

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
`

const OwnedNFTSection = () => {
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
	return (
		<Wrapper>
			<Header>Owned NFTs </Header>
			<CardSectionContainer>
				<Suspense>
					{cardContent.map((item,index)=>(
						<Card
							key={index}
							data={item}
							collections
						/>
					))}
				</Suspense>
			</CardSectionContainer>
		</Wrapper>
	)
}

export default OwnedNFTSection
