import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";
import constants from "@utils/constants";
import LogoIcon from "@static/svg/Logo";
import { respondTo } from "@styles/styledMediaQuery";
import { Link } from "react-router-dom";

const WaveContainer = styled.div`
	width: 100%;
	& > div {
		display: flex !important;
		& > svg {
			align-self: flex-end;
		}
	}
`;

const Container = styled.div`
	background: linear-gradient(
		180deg,
		rgba(var(--app-theme-value), var(--wave-start-opacity)),
		var(--app-theme-primary-dark)
	);
	/* background :var(--app-container-bg-primary); */
	min-height: 16rem;
	padding: 6rem;
	padding-top: 4rem;
	padding-bottom: 0;
	display: grid;
	grid-template-columns: minmax(75%, 1fr) repeat(2, minmax(0, 1fr));
	grid-template-rows: 1fr minmax(0, auto);
	${respondTo.md`
		grid-template-rows: repeat(3, minmax(0, auto));
		grid-template-columns: 1fr minmax(0, auto);
		padding: 2rem;
		text-align:left;
		row-gap: 2rem;
	`}
`;

const FooterWrapper = styled.footer``;

const LogoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	${respondTo.md`
		grid-column: 1 / -1;
	`}
`;

const LogoContainer = styled.a`
	cursor: pointer;
	user-select: none;
	display: inline-block;
	align-items: center;
	font-size: 2.5rem;
	font-weight: 900;
	text-decoration: none;
	width: fit-content;
	color: var(--app-text);
	svg {
		height: 2.5rem;
		width: 2.5rem;
	}
	span,
	svg {
		vertical-align: middle;
	}
	span {
		line-height: 1;
		padding-left: 0.5rem;
	}
`;

const NotStyledLink = styled(Link)`
	line-height: 1;
	text-decoration: none;
	color: inherit;
`;

const LinksContainer = styled.div`
	padding: 0 1.25rem;
	padding-bottom: 0.75rem;
	font-weight: 700;
	text-align: ${props => (props.align ? props.align : `inherit`)};
	* {
		margin-top: 0.75rem;
	}
	a {
		display: block;
		color: #ccc;
		font-size: 1.125rem;
		transition: color 0.2s ease;
		&:hover {
			color: var(--app-text);
			text-decoration: underline;
			text-underline-offset: 0.2rem;
			text-underline-thickness: 0.1rem;
		}
	}
`;

const BottomContainer = styled.div`
	grid-column: 1 / -1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 4rem;
	margin-bottom: 2rem;
	padding: 1rem 0;
	${respondTo.md`
		margin: 0;
	`}
`;

const Copyright = styled.p`
	font-weight: 700;
	font-size: 0.875rem;
	color: var(--app-container-text-primary-hover);
`;

const IconsWrapper = styled.div`
	display: flex;
	align-items: center;
	color: #ccc;
	padding-left: 1rem;
	margin-left: 1rem;
	border-left: 1px solid rgba(204, 204, 204, 0.5);
	svg {
		display: inline-block;
		vertical-align: middle;
		transition: color 0.2s ease;
		&:hover {
			color: var(--app-text);
		}
	}
	*:not(:last-child) {
		margin-right: 0.375rem;
	}
	a {
		line-height: 1;
		text-decoration: none;
		color: inherit;
	}
`;

const TwitterIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
		</svg>
	);
};

const GithubIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
			></path>
		</svg>
	);
};

const IconsContainer = () => {
	const iconList = [
		{
			name: "twitter",
			link: "https://twitter.com/" + constants.SOCIAL.TWITTER_HANDLE,
			icon: <TwitterIcon />,
		},
		{
			name: "github",
			link: "https://github.com/" + constants.SOCIAL.GITHUB_HANDLE,
			icon: <GithubIcon />,
		},
	];
	return (
		<IconsWrapper>
			{iconList.map(icon => (
				<a
					key={icon.name}
					href={icon.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					{icon.icon}
				</a>
			))}
		</IconsWrapper>
	);
};

const CopyrightSection = () => {
	return (
		<BottomContainer>
			<Copyright>
				&copy; 2021-{new Date().getFullYear()}{" "}
				{constants.APP_WEBSITE.replace("https://", "")} | All Rights
				Reserved
			</Copyright>
			<IconsContainer />
		</BottomContainer>
	);
};

const FooterContent = () => {
	const navLinks = [
		{
			name: "Sale",
			link: "/explore/sale",
		},
		{
			name: "Auctions",
			link: "/explore/auctions",
		},
		{
			name: "Raffles",
			link: "/explore/raffles",
		},
		{
			name: "Loans",
			link: "/explore/loans",
		},
	];

	const technicalLinks = [
		{
			name: "Terms of Service",
			link: "/terms-of-service",
		},
		{
			name: "Privacy Policy",
			link: "/privacy-policy",
		},
	];

	return (
		<Container>
			<LogoWrapper>
				<LogoContainer href="/" className="animate-icon">
					<LogoIcon />
					<span>{constants.APP_NAME}</span>
				</LogoContainer>
			</LogoWrapper>
			<LinksContainer>
				{navLinks.map((link, index) => (
					<NotStyledLink key={index} to={link.link}>
						{link.name}
					</NotStyledLink>
				))}
			</LinksContainer>
			<LinksContainer align="right">
				{technicalLinks.map((link, index) => (
					<NotStyledLink key={index} to={link.link}>
						{link.name}
					</NotStyledLink>
				))}
			</LinksContainer>
			<CopyrightSection />
		</Container>
	);
};

const WaveSection = () => {
	return (
		<WaveContainer>
			<Wave
				fill="rgba(var(--app-theme-value),var(--wave-start-opacity))"
				// fill="var(--app-container-bg-primary)"
				paused={false}
				options={{
					height: 100,
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
	);
};

const Footer = () => {
	return (
		<FooterWrapper>
			<WaveSection />
			<FooterContent />
		</FooterWrapper>
	);
};

export default Footer;
