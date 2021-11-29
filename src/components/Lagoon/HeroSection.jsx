import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled, { keyframes } from "styled-components";
import DesignSection from "./DesignSection";
import {LazyMotion,m,domAnimation} from "framer-motion";
import SimpleBarReact from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1.heading{
			padding-left: 2rem;
		}
	`}
`

const Heading = styled.h1`
	font-size: 2rem;
	font-weight: 900;
	span{
		vertical-align: top;
		padding: 0.125rem 0.5rem;
		border-radius: 1000rem;
		background: linear-gradient(45deg, #0D68D8, #0BBAFB);
		font-size: 0.675rem;
		margin-left: 1rem;
		user-select: none;
		cursor: default;
	}
`

const ContentSection = styled.div`
	position: relative;
	z-index:4;
`

const Card = styled(m.div)`
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(140, 140, 140, 0) 100%), url(${props => props.img});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	min-height: 13rem;
	height: 13rem;
	min-width: 13rem;
	width: 13rem;
	border-radius: 1rem;
	padding:1rem;
	cursor: pointer;
	text-align:left;
	& *{
		cursor:pointer;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	h1{
		font-weight: 900;
		font-size: 2rem;
	}
`

const slideLeft = keyframes`
	from{
		transform: translateX(-1rem);
		opacity:0;
	}
	to{
		transform: translateX(0.5rem);
		opacity:1;
	}
`

const FeaturedSectionContainer = styled.div`
	display: flex;
	/* flex-direction: column; */
	border-radius: 1rem;
	padding-top: 1rem;
	div.featured-section-heading{
		/* position: relative;
		font-size:1.25rem;
		font-weight: 600;
		padding: 0;
		border-radius: 0.25rem;
		width: fit-content;
		height: fit-content;
		cursor: normal;
		color: var(--app-container-text-primary); */
		min-height: 100%;
		width:0.25rem;
		background:linear-gradient(180deg,#ff931f,#FFAA33);
		border-radius: 1000rem;
		margin-left: 0;
	}
	${respondTo.md`
		flex-direction: column;
		padding: 0 2rem;
		h1.featured-section-heading{
			margin-left: 0;
			font-size:1rem;
			padding: 0.125rem 0.75rem;
		}
	`}
`

const CardsContainer = styled.div`
	display: flex;
	gap: 1rem;
	padding: 1rem 0;
`

const SimpleBarContainer = styled(SimpleBarReact)`
	overflow-x: auto;
	width: 75%;
	${respondTo.md`
		width: 100%;
	`}
`

const FeaturedSectionBar = styled.div`
	padding: 1rem;
	padding-left: 0;
    margin-right: 0.5rem;
	cursor: pointer;
	&:hover{
		.featured-section-heading:after{
			content: attr(data-text);
			position: absolute;
			z-index:5;
			font-weight: 900;
			background:linear-gradient(45deg, #0D68D8, #0BBAFB);
			padding: 0.25rem 0.5rem;
			border-radius: 1000rem;
			box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
			margin-left:0.5rem;
			animation: ${slideLeft} 0.2s ease forwards;
		}
	}
`

const RegularSection = () => {
	const featured = [{
		name: "Ink Sacs",
		author: "SQWID",
		link: "https://google.com",
		img: "https://unsplash.it/300/300?image=10"
	},{
		name: "Bink Bacs",
		author: "Boidushya",
		link: "https://boidushya.com",
		img: "https://unsplash.it/300/300?image=11"
	}, {
		name: "Link Lacs",
		author: "Andi",
		link: "https://andithemudkip.now.sh",
		img: "https://unsplash.it/300/300?image=12"
		}]
	return (
		<FeaturedSectionContainer>
			<LazyMotion features={domAnimation}>
				<SimpleBarContainer>
					<CardsContainer>
						{featured?.map((item, index) => (
							<Card
								key={index}
								img={item.img}
								whileHover={{
									x: 0,
									y: -10,
									scale: 1.01,
								}}
								onClick={() => window.open(item.link)}
							>
								<label title={item.name}><h1>{item.name}</h1></label>
								<label title={item.author}><p>by {item.author}</p></label>
							</Card>
						))}
					</CardsContainer>
				</SimpleBarContainer>
			</LazyMotion>
		</FeaturedSectionContainer>
	)
}

const FeaturedSection = () => {
	const featured = [{
			name: "Ink Sacs",
			author: "SQWID",
			link:"https://google.com",
			img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
		}]
	return (
		<FeaturedSectionContainer>
			<LazyMotion features={domAnimation}>
				<FeaturedSectionBar>
					<div className="featured-section-heading" data-text="Featured"/>
				</FeaturedSectionBar>
				<SimpleBarContainer>
					<CardsContainer>
						{featured?.map((item, index) => (
							<Card
								key={index}
								img={item.img}
								whileHover={{
									x:0,
									y:-10,
									scale: 1.01,
								}}
								onClick={() => window.open(item.link)}
							>
								<label title={item.name}><h1>{item.name}</h1></label>
								<label title={item.author}><p>by {item.author}</p></label>
							</Card>
						))}
					</CardsContainer>
				</SimpleBarContainer>
			</LazyMotion>
		</FeaturedSectionContainer>
	)
}

const HeroSection = () => {
	return (
		<Wrapper>
			<ContentSection>
				<Heading className="heading">Lagoon<span>BETA</span></Heading>
				<FeaturedSection />
				<RegularSection />
			</ContentSection>
			<DesignSection/>
		</Wrapper>
	)
}

export default HeroSection