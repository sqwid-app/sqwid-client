import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { respondTo } from "@styles/styledMediaQuery";

const Container = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	opacity: 0.375;
	${respondTo.md`
		opacity: 0.25;
	`}
	& > div {
		display: flex !important;
		& > svg {
			align-self: flex-end;
		}
	}
	.water {
		position: relative;
		z-index: 2;
	}
	.sand {
		position: absolute;
		bottom: 0;
		z-index: 3;
		width: 100vw;
	}
	.sun {
		position: absolute;
		bottom: 0;
		right: 25%;
		z-index: 1;
		${respondTo.md`
			bottom: -100%;
		`}
	}
`;

const Sun = () => (
	<svg
		className="sun"
		width="300"
		height="300"
		viewBox="0 0 300 300"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="150" cy="150" r="150" fill="url(#paint0_linear_780_138)" />
		<defs>
			<linearGradient
				id="paint0_linear_780_138"
				x1="150"
				y1="150"
				x2="150"
				y2="-4.23193e-06"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#ff931f" />
				<stop offset="1" stopColor="#FFFD14" />
			</linearGradient>
		</defs>
	</svg>
);

const Sand = () => (
	<svg
		className="sand"
		viewBox="0 0 1440 139"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 30.7403L60 48.7836C120 66.8269 240 102.913 360 114.942C480 126.971 600 114.942 720 84.8702C840 54.798 960 6.68262 1080 0.668193C1200 -5.34623 1320 30.7403 1380 48.7836L1440 66.8269V139H1380C1320 139 1200 139 1080 139C960 139 840 139 720 139C600 139 480 139 360 139C240 139 120 139 60 139H0V30.7403Z"
			fill="url(#paint0_linear_780_137)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_780_137"
				x1="0%"
				y1="0%"
				x2="0%"
				y2="100%"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FECF59" />
				<stop offset="1" stopColor="#FFAA33" />
			</linearGradient>
		</defs>
	</svg>
);

const Water = () => (
	<svg
		className="water"
		viewBox="0 0 1440 194"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1440 0L1320 28C1200 57 960 115 720 129C480 144 240 115 120 100L0 86V302H120C240 302 480 302 720 302C960 302 1200 302 1320 302H1440V0Z"
			fill="url(#paint0_linear_780_147)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_780_147"
				x1="668.5"
				y1="73.5"
				x2="667.5"
				y2="177.5"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#007BD5" />
				<stop offset="1" stopColor="#11CAA3" />
			</linearGradient>
		</defs>
	</svg>
);

const DesignSection = () => {
	const isTabletOrMobile = useIsTabletOrMobile();
	return (
		<Container>
			<Sand />
			<Sun />
			{isTabletOrMobile ? (
				<Water />
			) : (
				<Wave
					className="water"
					fill="url(#gradient)"
					paused={false}
					options={{
						height: 25,
						amplitude: 45,
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
									stopColor: "#007BD5",
									stopOpacity: "1",
								}}
							/>
							<stop
								offset="100%"
								style={{
									stopColor: "#11CAA3",
									stopOpacity: "1",
								}}
							/>
						</linearGradient>
					</defs>
				</Wave>
			)}
		</Container>
	);
};

export default DesignSection;
