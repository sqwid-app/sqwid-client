import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import SimpleBarReact from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

const Wrapper = styled(SimpleBarReact)`
	overflow: auto;
	max-height: 16rem;
`

const CardsContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	height: 4rem;
	padding: 1rem 1.25rem;
`

const Icon = styled.div`
	height: 1.75rem;
	width: 1.75rem;
	border-radius: 1000rem;
	outline: 2px solid white;
	background-color: var(--app-background);
	background-image: url('${props=>props.url&&props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const UserInfo = styled.div`
	display: flex;
	align-items:center;
	gap: 0.75rem;
`
const PriceInfo = styled.div`
	text-align: right;
`

const Price = styled.div`
	font-weight: 900;
	svg{
		display: inline-block;
		vertical-align: bottom;
	}
`

const Copies = styled.div`
	color: var(--app-container-text-primary);
`

const Name = styled.h1`
	font-weight: 900;
	font-size: 1.25rem;
`

const BidsCard = (info) => {
	return (
		<CardsContainer>
			<UserInfo>
				<Icon url={info.bidder.thumb}/>
				<Name>{info.bidder.name}</Name>
			</UserInfo>
			<PriceInfo>
				<Price><ReefIcon centered size={24}/> <span>{numberSeparator(info.price)}</span></Price>
				<Copies>{numberSeparator(info.copies)} Copies</Copies>
			</PriceInfo>
		</CardsContainer>
	)
}

const BidsSection = () => {
	const bidsHistory = [{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/andi.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
			id:"5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"
		},
		price:"2000",
		copies:"10",
	}]
	return (
		<Wrapper>
			{bidsHistory.map(item=>(
				<BidsCard {...item}/>
			))}
		</Wrapper>
	)
}

export default BidsSection
