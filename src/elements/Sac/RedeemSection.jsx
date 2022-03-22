import React, { useContext } from "react";
import Container from "./Container";
import Heading from "./Heading";
import styled, { css } from "styled-components";
import SacContext from "@contexts/Sac/SacContext";
import { m, LazyMotion, domAnimation } from "framer-motion";
import ReefIcon from "@static/svg/ReefIcon";
import { useHistory } from "react-router";

const centerFlex = css`
	align-items: center;
	justify-content: center;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	${props => props.isEmpty && centerFlex};
	gap: 0.5rem;
	min-width: 20rem;
	max-width: 20rem;
	min-height: 12rem;
	p.empty {
		font-size: 1.25rem;
		font-weight: 200;
		color: var(--app-container-text-primary-hover);
		display: grid;
		place-items: center;
		height: 100%;
		padding-bottom: 1rem;
	}
`;

const Image = styled.div`
	background: linear-gradient(
			0deg,
			rgba(132, 32, 28, 0.35),
			rgba(15, 71, 135, 0.35)
		),
		url(${props => props.url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	min-height: 4rem;
	max-height: 4rem;
	min-width: 4rem;
	max-width: 4rem;
	border-radius: 0.5rem;
`;

const CardContainer = styled(m.div)`
	display: flex;
	align-items: center;
	gap: 1rem;
	width: 100%;
	color: inherit;
	text-decoration: none;
	padding: 0.75rem;
	font-size: 1rem;
	background: var(--app-container-bg-secondary);
	border-radius: 0.5rem;
	cursor: pointer;
	* {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
	}
	span {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
	}
	p.price {
		font-weight: 900;
		display: flex;
		align-items: center;
	}
`;

const MetaContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Card = props => {
	const { setSacDetails } = useContext(SacContext);
	const history = useHistory();
	const handleClick = () => {
		history.push(`/sac/${props.id}`);
		setSacDetails(props);
	};
	return (
		<CardContainer
			whileHover={{
				y: -5,
			}}
			onClick={handleClick}
		>
			{/* <p>{props.image}</p> */}
			<Image url={props.image} alt={props.name} />
			<MetaContainer>
				<h3>
					<label title={props.name}>{props.name}</label>
				</h3>
				<span>
					<p>
						<label title={`Wave ${props.wave}`}>
							Wave {props.wave}
						</label>
					</p>
					<p className="price">
						<ReefIcon size={20} />
						<label title={props.price}>{props.price}</label>
					</p>
				</span>
			</MetaContainer>
		</CardContainer>
	);
};

const RedeemSection = () => {
	const { sacDetails } = useContext(SacContext);
	return (
		<Container>
			<Heading>Redeem</Heading>
			<ItemContainer isEmpty={sacDetails.redeemCards.length === 0}>
				{sacDetails.redeemCards.length !== 0 ? (
					<LazyMotion features={domAnimation}>
						{sacDetails.redeemCards.map((card, index) => (
							<Card key={index} {...card} />
						))}
					</LazyMotion>
				) : (
					<p className="empty">*crickets chirp*</p>
				)}
			</ItemContainer>
		</Container>
	);
};

export default RedeemSection;
