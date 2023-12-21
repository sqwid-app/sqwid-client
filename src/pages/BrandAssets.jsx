import Wrapper from "@components/Default/Wrapper";
import React from "react";
import styled from "styled-components";
import LayeredWaves from "@static/svg/LayeredWaves.svg";
import constants from "@utils/constants";
import { respondTo } from "@styles/styledMediaQuery";
import Footer from "@components/LandingRedesign/Footer";

const HeroContainer = styled.div`
	height: calc(100vh / 3);
	width: 100vw;
	background: var(--app-theme-primary-dark);
	display: grid;
	padding-inline: 4rem;
	align-items: center;
	position: relative;
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.6), transparent);
		z-index: 1;
	}
	h1 {
		font-size: 4rem;
		font-weight: 900;
		position: relative;
		z-index: 1;
	}
	img {
		position: absolute;
		bottom: 0;
		z-index: 0;
	}
`;

const MainSection = styled.div`
	padding: 6rem;
	padding-bottom: 0;
	h1 {
		font-size: 1.75rem;
		margin-bottom: 3rem;
		color: var(--app-text);
		text-transform: uppercase;
	}
	svg {
		height: 4rem;
	}
	color: white;
	h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--app-container-text-primary);
	}
	a {
		font-size: 2rem;
		color: white;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	width: 50%;
	gap: 0.75rem;
	${respondTo.md`
		width:100%;
	`}
`;

const CorrectVariant = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 0.15rem solid rgba(34, 197, 94, 0.33);
	border-radius: 2rem;
	padding: 1rem;
	img {
		height: 4rem;
	}
	.tick {
		color: var(--app-container-check);
		height: 2rem !important;
	}
	.cross {
		color: rgb(244 63 94);
		height: 2rem !important;
	}
	.flex {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		img {
			height: 3rem;
		}
		svg {
			height: 2rem;
		}
	}
	span {
		font-size: 2rem;
		font-weight: 900;
		line-height: 0;
	}
`;

const Variant = styled(CorrectVariant)`
	border: 0.15rem solid rgba(255, 255, 255, 0.33);
	a {
		font-weight: 700;
		font-size: 0.875rem;
		text-decoration: none;
		color: var(--app-container-text-primary-hover);
		&:hover {
			color: rgba(var(--app-theme-value), 1);
			text-decoration: underline;
		}
	}
`;

const WrongVariant = styled(CorrectVariant)`
	border: 0.15rem solid rgba(244, 63, 94, 0.33);
	justify-content: space-between;
	.tip {
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
		color: rgb(253 164 175);
		svg {
			display: block;
		}
		p {
			width: 50%;
			font-size: 0.75rem;
		}
	}
`;

const GridWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	${respondTo.md`
		flex-direction:column;
	`}
`;

const VariantContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0.75rem;
	padding-right: 1rem;
	${respondTo.md`
		width:100%;
		padding-right:0;
	`}
`;

const TypographySection = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 2rem;
	${respondTo.md`
		width:100%;
	`}
`;

const WeightSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	font-size: 2rem;
`;

const ColorText = styled.div`
	p {
		font-size: 2rem;
	}
	.variant1 {
		color: var(--app-container-text-primary);
	}
	.variant2 {
		color: var(--app-container-text-primary-hover);
	}
	.variant3 {
		color: white;
	}
	.variant4 {
		font-size: 0.97rem;
		padding-top: 0.5rem;
		background: -webkit-linear-gradient(
			0deg,
			var(--app-text) 0%,
			rgb(97, 159, 235) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`;

const SectionWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	justify-content: space-between;
	gap: 2rem;
`;

const BrandAssets = () => {
	const download = e => {
		e.preventDefault();
		fetch(e.target.href, {
			method: "GET",
			headers: {},
		})
			.then(response => {
				response.arrayBuffer().then(function (buffer) {
					const url = window.URL.createObjectURL(new Blob([buffer]));
					const link = document.createElement("a");
					link.href = url;
					link.setAttribute(
						"download",
						e.target.getAttribute("data-name")
					); //or any other extension
					document.body.appendChild(link);
					link.click();
				});
			})
			.catch(err => {
				// console.error(err);
			});
	};
	return (
		<Wrapper>
			<HeroContainer>
				<h1>Brand Assets</h1>
				<img alt="bg" src={LayeredWaves} />
			</HeroContainer>
			<MainSection>
				<h1>{constants.APP_NAME} Logos Variant</h1>
				<GridWrapper>
					<GridContainer>
						<CorrectVariant>
							<svg
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 700 700"
								fill="currentColor"
								xmlSpace="preserve"
							>
								<path
									d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
								/>
							</svg>
							<TickIcon />
						</CorrectVariant>
						<CorrectVariant>
							<div className="flex">
								<svg
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 700 700"
									fill="currentColor"
									xmlSpace="preserve"
								>
									<path
										d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
									/>
								</svg>
								<span>{constants.APP_NAME}</span>
							</div>
							<TickIcon />
						</CorrectVariant>
						<CorrectVariant>
							<img src={"/logo.png"} alt="logo" />
							<TickIcon />
						</CorrectVariant>
						<CorrectVariant>
							<div className="flex">
								<img src={"/logo.png"} alt="logo" />
								<span>{constants.APP_NAME}</span>
							</div>

							<TickIcon />
						</CorrectVariant>
					</GridContainer>
					<GridContainer>
						<WrongVariant>
							<svg
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 700 700"
								fill="rgb(64, 64, 64)"
								xmlSpace="preserve"
							>
								<path
									d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
								/>
							</svg>
							<div className="tip">
								<CrossIcon />
								<p>Visibility low due to low contrast colors</p>
							</div>
						</WrongVariant>
						<WrongVariant>
							<div className="flex">
								<svg
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 700 700"
									fill="currentColor"
									xmlSpace="preserve"
								>
									<path
										d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
									/>
								</svg>
								<span>Ocean</span>
							</div>
							<div className="tip">
								<CrossIcon />
								<p>App name is not correct</p>
							</div>
						</WrongVariant>
						<WrongVariant>
							<svg
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 700 700"
								fill="rgba(255, 255, 255,1)"
								stroke="red"
								strokeWidth={15}
								xmlSpace="preserve"
							>
								<path
									d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
								/>
							</svg>
							<div className="tip">
								<CrossIcon />
								<p>Outline has been added to the logo</p>
							</div>
						</WrongVariant>
						<WrongVariant>
							<svg
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 700 700"
								fill="currentColor"
								xmlSpace="preserve"
							>
								<defs>
									<filter
										id="shadow"
										x="0"
										y="0"
										width="200%"
										height="200%"
									>
										<feOffset
											result="offOut"
											in="SourceGraphic"
											dx="30"
											dy="30"
										/>
										<feGaussianBlur
											result="blurOut"
											in="offOut"
											stdDeviation="15"
										/>
										<feBlend
											in="SourceGraphic"
											in2="blurOut"
											mode="normal"
										/>
									</filter>
								</defs>
								<path
									d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
				c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
				c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
				c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
				c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
				c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
				c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
				c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
				c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
				c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
									filter="url(#shadow)"
								/>
							</svg>
							<div className="tip">
								<CrossIcon />
								<p>Shadow has been added to the logo</p>
							</div>
						</WrongVariant>
					</GridContainer>
				</GridWrapper>
			</MainSection>
			<MainSection
				style={{
					paddingBottom: "4rem",
				}}
			>
				<SectionWrapper>
					<div>
						<h1>Download Assets</h1>
						<VariantContainer>
							<Variant>
								<img src={"/logo.png"} alt="Sqwid Logo" />
								<a
									data-name="sqwid.png"
									href="/logo.png"
									onClick={e => download(e)}
								>
									PNG
								</a>
							</Variant>
							<Variant>
								<svg
									version="1.1"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 700 700"
									fill="currentColor"
									xmlSpace="preserve"
								>
									<path
										d="M350,49C206.9,49,91,164.9,91,308v21c0,22.5,9.5,41.8,22.5,55.1S142.9,406,161,406h56v91c0,18.6-11.1,28-28,28
						c-9,0-17.8-6.4-23.4-16.8c-3.5-6.6-10.3-10.9-17.8-11.2c-7.5-0.3-14.6,3.5-18.6,9.8c-4,6.4-4.3,14.4-0.8,21
						c11.3,21.2,33,39.2,60.6,39.2c37.4,0,70-30.4,70-70v-91h28v161c0,18.6-11.1,28-28,28c-8.1,0-15.6-3.2-19.9-7.7
						c-3.8-4.4-9.2-7.1-15-7.4c-5.8-0.3-11.4,1.8-15.6,5.9c-4.2,4-6.5,9.6-6.4,15.4c0.1,5.8,2.5,11.3,6.8,15.2
						c13.3,13.8,31.7,20.6,50.1,20.6c37.4,0,70-30.4,70-70V406h42v161c0,39.6,32.6,70,70,70c18.4,0,36.8-6.8,50.1-20.6
						c4.3-3.9,6.7-9.4,6.8-15.2c0.1-5.8-2.3-11.4-6.4-15.4c-4.2-4-9.8-6.1-15.6-5.9c-5.8,0.3-11.2,2.9-15,7.4c-4.3,4.4-11.8,7.7-19.9,7.7
						c-16.9,0-28-9.4-28-28V406h28v91c0,39.6,32.6,70,70,70c27.6,0,49.3-17.9,60.6-39.2c3.5-6.6,3.2-14.7-0.8-21
						c-4-6.4-11.1-10.1-18.6-9.8c-7.5,0.3-14.3,4.5-17.8,11.2C528.8,518.6,520,525,511,525c-16.9,0-28-9.4-28-28v-91h56
						c18.1,0,34.4-8.6,47.5-21.9S609,351.5,609,329v-21C609,164.9,493.1,49,350,49L350,49z M350,91c120.6,0,217,96.4,217,217v21
						c0,10.7-4.5,19.2-10.7,25.6S541.9,364,539,364H161c-2.9,0-11.1-3-17.3-9.4S133,339.7,133,329v-21C133,187.4,229.4,91,350,91z"
									/>
								</svg>
								<a
									data-name="sqwid.svg"
									href="/sqwid.svg"
									onClick={e => download(e)}
								>
									SVG
								</a>
							</Variant>
						</VariantContainer>
					</div>
					<div>
						<h1>Typography</h1>
						<TypographySection>
							<div>
								<h3>Font</h3>
								<p>
									<a
										href="https://fonts.google.com/specimen/Nunito+Sans"
										target="_blank"
										rel="noreferrer"
									>
										Nunito Sans
									</a>
								</p>
							</div>
							<div>
								<h3>Weights</h3>
								<WeightSection>
									<p
										style={{
											fontWeight: "300",
										}}
									>
										300
									</p>
									<p
										style={{
											fontWeight: "400",
										}}
									>
										400
									</p>
									<p
										style={{
											fontWeight: "600",
										}}
									>
										600
									</p>
									<p
										style={{
											fontWeight: "700",
										}}
									>
										700
									</p>
									<p
										style={{
											fontWeight: "800",
										}}
									>
										800
									</p>
									<p
										style={{
											fontWeight: "900",
										}}
									>
										900
									</p>
								</WeightSection>
							</div>
							<div>
								<h3>Colors</h3>
								<ColorText>
									<p className="variant1">
										rgb(120, 121, 135)
									</p>
									<p className="variant2">
										rgb(187, 187, 195)
									</p>
									<p className="variant3">
										rgb(255, 255, 255)
									</p>
									<p className="variant4">
										rgb(255, 255, 255) - rgb(97, 159, 235)
									</p>
								</ColorText>
							</div>
						</TypographySection>
					</div>
				</SectionWrapper>
			</MainSection>
			<Footer />
		</Wrapper>
	);
};

export default BrandAssets;

const TickIcon = () => {
	return (
		<svg
			className="tick"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
};

const CrossIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="cross"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);
