import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import Wave from "react-wavify";
import styled from "styled-components";

const WaveContainer = styled.div`
	position: absolute;
	bottom: 0;
	z-index: 0;
	width: 100%;
	& > div {
		display: flex !important;
		& > svg {
			align-self: flex-end;
		}
	}
	opacity: 0.75;
`;

const Main = styled.main`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
	text-align: center;
	${respondTo.md`
		padding-inline: 1rem;
	`}
	z-index: 1;
	* {
		line-height: 1;
		margin: 0;
	}
	h1 {
		margin-top: 1rem;
		font-size: 2rem;
		font-weight: 700;
	}
	h2 {
		color: var(--app-container-text-primary);
		font-size: 1.25rem;
		font-weight: 500;
		svg {
			color: var(--app-container-text-primary-hover);
		}
	}
`;

const Container = styled.div`
	position: static;
	z-index: 1;
	display: grid;
	place-items: center;
	gap: 1rem;
`;

const BoxWindow = styled.div`
	position: relative;
	user-select: none;
	width: 32rem;
	height: 24rem;
	background: rgb(34, 38, 54);
	box-shadow: 0.25rem 0.25rem 0.5rem 0.5rem rgba(11, 12, 17, 0.1);
	border-radius: 0.75rem;
	--dot1: rgb(255, 95, 88);
	--dot2: rgb(255, 189, 46);
	--dot3: rgb(40, 201, 65);
	overflow: hidden;
	${respondTo.md`
		width: 100%;
	`}
	.wrench-hammer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 12rem;
		color: #dbe3ff;
		z-index: 2;
		fill: rgba(11, 12, 17, 0.1);
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: calc(50% + 0.25rem);
		height: 100%;
		background: hsl(228, 22.727272727272727%, 12.254901960784313%);
	}
	.logo1 {
		height: 100%;
		position: absolute;
		z-index: 0;
		fill: hsla(228, 22.727272727272727%, 25.254901960784313%, 0.25);
		right: 0;
		top: -50%;
		transform: translate(50%, 25%);
	}
	.logo2 {
		height: 100%;
		position: absolute;
		z-index: 0;
		fill: hsla(228, 22.727272727272727%, 25.254901960784313%, 0.25);
		left: 0;
		bottom: 0;
		transform: translate(-50%, 75%);
	}
`;

const DotContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	padding: 0.75rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.25rem;
	span {
		width: 0.5rem;
		height: 0.5rem;
		display: block;
		border-radius: 1000rem;
	}
`;

const SocialsContainer = styled.div`
	display: flex;
	padding: 0;
	margin: 0;
	gap: 0.5rem;
	a {
		color: var(--app-container-text-primary);
		transition: 0.2s ease;
		&:hover {
			color: white;
		}
	}
`;

const Maintenance = () => {
	return (
		<Main>
			<Container>
				<BoxWindow>
					<DotContainer>
						<span
							style={{
								background: "var(--dot1)",
							}}
						/>
						<span
							style={{
								background: "var(--dot2)",
							}}
						/>
						<span
							style={{
								background: "var(--dot3)",
							}}
						/>
					</DotContainer>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="wrench-hammer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
						/>
					</svg>
					<svg
						version="1.1"
						id="Layer_1"
						className="logo1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 700 700"
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
					<svg
						version="1.1"
						id="Layer_1"
						className="logo2"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 700 700"
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
				</BoxWindow>
				<h1>Sqwid is currently under maintenance</h1>
				<h2>We will be back soon!</h2>
				<SocialsContainer>
					<a
						href="https://twitter.com/sqwid_app"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
						</svg>
					</a>
					<a
						href="https://discord.gg/FtkZE9aK8Z"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
						</svg>
					</a>
				</SocialsContainer>
			</Container>
			<WaveContainer>
				<Wave
					fill="rgba(var(--app-theme-value),var(--wave-start-opacity))"
					// fill="var(--app-container-bg-primary)"
					paused={false}
					options={{
						height: 50,
						amplitude: 25,
						speed: 0.25,
						points: 3,
					}}
				>
					<defs>
						<linearGradient
							id="gradient"
							x1="0%"
							y1="0%"
							x2="0%"
							y2="100%"
						>
							<stop
								offset="0%"
								style={{
									stopColor: "var(--app-theme-primary)",
									stopOpacity: "1",
								}}
							/>
							<stop
								offset="100%"
								style={{
									stopColor:
										"var(--app-theme-primary-transparent)",
									stopOpacity: "1",
								}}
							/>
						</linearGradient>
					</defs>
				</Wave>
			</WaveContainer>
		</Main>
	);
};

export default Maintenance;
