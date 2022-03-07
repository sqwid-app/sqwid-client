import React, { useContext } from "react";
import Container from "./Container";
import styled from "styled-components";
import SacContext from "@contexts/Sac/SacContext";
import { BtnBase } from "@elements/Default/BtnBase";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Heading from "./Heading";

const Image = styled.div`
	background: linear-gradient(
			0deg,
			rgba(132, 32, 28, 0.65),
			rgba(15, 71, 135, 0.65)
		),
		url(${props => props.url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 10rem;
	border-radius: 0.5rem 0.5rem 0 0;
`;

const FlexContainer = styled(Container)`
	display: flex;
	flex-direction: column;
`;

const ImageContainer = styled(m.div)`
	flex:1
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 12.5rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
	cursor: pointer;
`;

const ImageWrapper = styled.div`
	height: 100%;
	display: grid;
	place-items: center;
`;

const Btn = styled(BtnBase)`
	background: var(--app-modal-btn-primary);
	font-weight: 900;
	font-size: 1.125rem;
	border-radius: 0 0 0.5rem 0.5rem;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5rem;
`;

const ClaimSection = () => {
	const { sacDetails } = useContext(SacContext);
	return (
		<FlexContainer>
			<Heading>Available to claim</Heading>
			<LazyMotion features={domAnimation}>
				<ImageWrapper>
					<ImageContainer
						whileHover={{
							y: -10,
							x: 0,
						}}
					>
						<Image url={sacDetails.image} alt={sacDetails.name} />
						<Btn>Claim</Btn>
					</ImageContainer>
				</ImageWrapper>
			</LazyMotion>
		</FlexContainer>
	);
};

export default ClaimSection;
