import { BtnBase } from "@elements/Default/BtnBase";
import React from "react";
import styled, { css } from "styled-components";
import { LazyMotion, m, domAnimation } from "framer-motion";

const Container = styled.div`
	font-size: 1.25rem;
	border-radius: 0.5rem;
`

const imageText = css`
	&:after{
		content:attr(alt);
		position:absolute;
		padding: 0.25rem 0.5rem;
		font-weight: 800;
		bottom:0;
		left:0;
		font-size: 1rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: calc(100% - 1rem);
		opacity: 0;
		transform: translateY(100%);
		transition: transform 0.175s ease 0.0875s, opacity 0.175s ease 0.0875s;
	}
	&:hover{
		&:after{
			opacity:1;
			transform: translateY(0);
		}
	}

`

const Image = styled.div`
	position:relative;
	background: linear-gradient(180deg,rgba(255, 255, 255, 0), rgba(7, 32, 61, 0.85)), url(${props => props.url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 10rem;
	border-radius: 0.5rem 0.5rem 0 0;
	cursor: pointer;
	${imageText};
`

const FlexContainer = styled(Container)`
	display: flex;
	flex-direction: column;
`

const ImageContainer = styled(m.div)`
	flex:1;
	width: 12.5rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
	cursor: pointer;
`

const ImageWrapper = styled.div`
	height: 100%;
	display:grid;
	place-items:center;
`

const Btn = styled(BtnBase)`
	position: relative;
	z-index:2;
	background: var(--app-modal-btn-primary);
	font-weight: 900;
	font-size: 1.125rem;
	border-radius: 0 0 0.5rem 0.5rem;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5rem;
`

const Card = (props) => {
	return (
		<FlexContainer >
			<ImageWrapper>
				<LazyMotion features={domAnimation}>
					<ImageContainer
						whileHover={{
							y:-10
						}}
					>
						<label title={props.name}><Image url={props.image} alt={props.name} /></label>
						<Btn>Unwrap</Btn>
					</ImageContainer>
				</LazyMotion>
			</ImageWrapper>
		</FlexContainer>
	)
}

export default Card
