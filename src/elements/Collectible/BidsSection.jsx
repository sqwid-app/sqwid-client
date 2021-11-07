import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React, { useContext } from "react";
import styled, { css } from "styled-components";
import SimpleBarReact from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
import AuthContext from "@contexts/Auth/AuthContext";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Wrapper = styled(SimpleBarReact)`
	overflow: auto;
	max-height: 16rem;
`

const toolTip = css`
	&:before{
		content:"${props=>props.tooltip?props.tooltip:``}";
		position:absolute;
		top: -50%;
		left: 0;
		transform: translateX(-0.1rem);
		color: var(--app-container-text-primary-hover);
		background: var(--app-modal-btn-primary);
		font-weight: 900;
		font-size: 0.875rem;
		border-radius:0.25rem 0.25rem 0 0;
		opacity: 0;
		transition: opacity 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
		padding: 0.25rem 0.75rem;
		white-space:nowrap;
		display:none;
		overflow:hidden;
		text-overflow: ellipsis;
		max-width: 12rem;
		border: 0.1rem solid ${props=>props.isBidder?`red`:`none`};
		box-shadow: rgba(0, 0, 0, 0.35) 0px -5px 15px;
	}
	&:hover {
		border-radius: 0 0.375rem 0.375rem 0.375rem;
		&:before{
			opacity : 1;
			display : block;
		}
	}
`

const bidderContainer = css`
	border-radius: 0.375rem;
	border: 0.1rem solid red;
	cursor: pointer;
	${toolTip};
`

const CardsContainer = styled.div`
	position:relative;
	display: flex;
	align-items:center;
	height: 4rem;
	padding: 1rem 1.25rem;
	margin: 0 0.75rem;
	gap: 1rem;
	${props=>props.isBidder&&bidderContainer};

`

const InfoContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	flex:1;
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

const AcceptContainer = styled(m.a)`
	label{
		cursor: pointer;
		display: flex;
		align-items:center;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		gap: 0.25rem;
		border: 0.1rem solid var(--app-container-check);
		color: var(--app-container-check);
		font-weight:900;
		transition: all 0.2s ease;
		&:hover{
			color: var(--app-container-text);
			background: var(--app-container-check);
		}
	}
`

const BidsCard = (info) => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isSeller = auth&&(auth.evmAddress === collectibleInfo.owners.current.id)
	// const isSeller = true
	const isBidder = auth&&(auth.evmAddress === info.bidder.id) && !isSeller
	return (
		<CardsContainer isBidder={isBidder} tooltip={isBidder&&`Cancel Bid`}>
			<InfoContainer>
				<UserInfo>
					<Icon url={info.bidder.thumb}/>
					<Name>{info.bidder.name}</Name>
				</UserInfo>
				<PriceInfo>
					<Price><ReefIcon centered size={24}/> <span>{numberSeparator(info.price)}</span></Price>
					<Copies>{numberSeparator(info.copies)} Copies</Copies>
				</PriceInfo>
			</InfoContainer>
			{(isSeller&&!isBidder)&&(
				<LazyMotion features={domAnimation}>
					<AcceptContainer
						whileHover={{
							y:-5,
							x:0
						}}
						whileTap={{
							scale: 0.95
						}}
					>
							<label
								title="Accept Bid"
							>
								Accept
							</label>
					</AcceptContainer>
				</LazyMotion>
			)}
		</CardsContainer>
	)
}

const BidsSection = () => {
	const bidsHistory = [{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/0x2c15d99D65b2DB4592653827F1BCB9788a943f78.svg",
			id:"0x2c15d99D65b2DB4592653827F1BCB9788a943f78"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/0x2c15d99D65b2DB4592653827F1BCB9788a943f78.svg",
			id:"0x2c15d99D65b2DB4592653827F1BCB9788a943f78"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/0x2c15d99D65b2DB4592653827F1BCB9788a943f78.svg",
			id:"0x2c15d99D65b2DB4592653827F1BCB9788a943f78"
		},
		price:"2000",
		copies:"10",
	},{
		bidder: {
			name:"Andi",
			thumb:"https://avatars.dicebear.com/api/identicon/5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA.svg",
			id:"5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA"
		},
		price:"1000",
		copies:"5",
	},{
		bidder: {
			name:"Boidushya",
			thumb:"https://avatars.dicebear.com/api/identicon/0x2c15d99D65b2DB4592653827F1BCB9788a943f78.svg",
			id:"0x2c15d99D65b2DB4592653827F1BCB9788a943f78"
		},
		price:"2000",
		copies:"10",
	}]
	return (
		<Wrapper>
			{bidsHistory.map((item,index)=>(
				<BidsCard key={index} {...item}/>
			))}
		</Wrapper>
	)
}

export default BidsSection
