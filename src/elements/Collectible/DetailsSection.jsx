import { useState, useEffect, useRef } from "react";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import AuthContext from "@contexts/Auth/AuthContext";
import ReefIcon from "@static/svg/ReefIcon";
import constants from "@utils/constants";
import { getInfuraURL } from "@utils/getIPFSURL";
import { LazyMotion, m, domAnimation } from "framer-motion";
import React, { useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { respondTo } from "@styles/styledMediaQuery";
import { fetchCollectibleStats } from "@utils/marketplace";
import { numberSeparator } from "@utils/numberSeparator";
import LoadingIcon from "@static/svg/LoadingIcon";
const Wrapper = styled.div``;

const Container = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	${respondTo.md`
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	`}
`;

const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	color: var(--app-container-text-primary-hover);
	flex: 1;
	width: 100%;
`;

const StatusContainer = styled.div`
	display: flex;
	align-items: flex-end;
	align-self: flex-start;
	flex-direction: column;
	gap: 0.5rem;
	color: var(--app-container-text-primary-hover);
`;

const HTMLLinkWrapper = styled.a`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	text-decoration: none;
	color: inherit;
	transition: color 0.2s ease;
	cursor: pointer;
	&:hover {
		color: var(--app-text);
	}
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
	span {
		font-size: 1.25rem;
		font-weight: 800;
	}
`;

const TextWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	text-decoration: none;
	color: inherit;
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
	span {
		font-size: 1.25rem;
	}
	div {
		flex: 1;
		text-align: right;
	}
`;

const StatusWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	min-width: 100%;
	justify-content: space-between;
	/* svg {
		width: 1.5rem;
		height: 1.5rem;
	} */
	span {
		font-size: 1.25rem;
		font-weight: 800;
	}
`;

const MiddleContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	color: var(--app-container-text-primary-hover);
	border-top: solid 0.1rem var(--app-container-bg-primary);
	${respondTo.md`
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	`}
`;

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	gap: 1rem;
	margin-top: 1rem;
	border-top: solid 0.1rem var(--app-container-bg-primary);
	padding-top: 1.5rem;
	${respondTo.md`
		justify-content: flex-start;
		margin-bottom: 1rem;
	`}
`;

const BtnContainer = styled.div`
	position: relative;
	span {
		text-transform: capitalize;
	}
	.popup {
		padding-top: 0.25rem;
		position: absolute;
		font-weight: 800;
		bottom: calc(-50% - 0.125rem);
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 0.2s ease 0.15s;
	}
	&:hover {
		.popup {
			opacity: 1;
		}
	}
`;

const StatusDisplay = styled.div`
	border: 0.15rem solid
		hsla(var(--status-${props => props.variant}), 50%, 100%);
	border-radius: 0.5rem;
	background: hsla(var(--status-${props => props.variant}), 50%, 25%);
	padding: 0.375rem 0.5rem;
	padding-right: 0.75rem;
	font-weight: 800;
	margin-left: 0.5rem;
	text-transform: capitalize;
	color: hsla(var(--status-${props => props.variant}), 95%, 100%);
	line-height: 1;
	user-select: none;
	.dot {
		color: hsla(var(--status-${props => props.variant}), 50%, 100%);
		padding-right: 0.125rem;
	}
`;

const Tooltip = styled.div`
	position: absolute;
	top: 0;
	left: 100%;
	bottom: 0;
	right: 0;
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: var(--app-container-bg-primary);
	user-select: none;
	z-index: 15;
	white-space: nowrap;
	width: fit-content;
	place-items: center;
	${props => (!props.remove ? entryAnim : exitAnim)};
`;

const swipeDownwards = keyframes`
	0% {
		opacity:0;
		transform: translateX(-25%);
	}
	100% {
		opacity:1;
		transform: translateX(1rem);
	}
`;

const swipeUpwards = keyframes`
	0% {
		opacity: 1;
		transform: translateX(1rem);
	}
	100% {
		opacity:0;
		transform: translateX(-25%);
	}
`;

const entryAnim = css`
	animation: ${swipeDownwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const exitAnim = css`
	animation: ${swipeUpwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const Price = styled.div`
	font-weight: 900;
	svg {
		display: inline-block;
		vertical-align: bottom;
	}
	margin: 0 auto;
`;

const StatContainer = styled.div`
	width: 100%;
	border-radius: 1rem;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	flex: 1;
	margin-top: .2rem;
	margin-bottom: .2rem;
	gap: 0.5rem;
	text-decoration: none;
	color: inherit;
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
	span {
		font-size: 1.25rem;
	}
`;

const StatName = styled.div`
	font-weight: 700;
	font-size: 1.1rem;
	color: var(--app-container-text-primary-hover);
	flex: 1;
`;

const StatusSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	let status;
	switch (collectibleInfo.approved) {
		case true:
			status = "approved";
			break;
		case false:
			status = "rejected";
			break;
		case null:
			status = "pending";
			break;
		default:
			status = "error";
	}
	return (
		<StatusWrapper>
			<span>Status</span>
			<StatusDisplay variant={status}>
				<span className="dot">•</span> {status}
			</StatusDisplay>
		</StatusWrapper>
	);
};
const ShareBtn = ({ to }) => {
	const tooltipRef = useRef();
	const [tooltipVisible, setTooltipVisible] = useState(false);
	useEffect(() => {
		if (tooltipVisible) tooltipRef.current.style.display = "grid";
		else {
			setTimeout(() => {
				if (tooltipRef.current)
					tooltipRef.current.style.display = "none";
			}, 400);
		}
	}, [tooltipVisible]);

	const copyAddress = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			setTooltipVisible(true);
			setTimeout(() => {
				setTooltipVisible(false);
			}, 1000);
		});
	};

	return (
		<BtnContainer>
			{window.isSecureContext && (
				<>
					<m.div
						whileHover={{
							y: -2.5,
						}}
						whileTap={{
							scale: 0.95,
						}}
						onClick={copyAddress}
						title="Share"
						className="btn--dark btn--dark__share"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path>
						</svg>
						{/* <span>Share</span> */}
					</m.div>
					<p className="popup">Share</p>
				</>
			)}
			<Tooltip
				style={{ display: "none" }}
				ref={tooltipRef}
				remove={!tooltipVisible}
			>
				{" "}
				Copied to clipboard!
			</Tooltip>
		</BtnContainer>
	);
};

const Icon = ({ type }) => {
	return (
		<>
			{type === "Report" && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0 1 12 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0 1 12 4c4.411 0 8 3.589 8 8a7.954 7.954 0 0 1-1.688 4.897z"></path>
				</svg>
			)}
			{type === "Appeal" && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
					<path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
				</svg>
			)}
		</>
	);
};

const ReportBtn = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	const { auth } = useContext(AuthContext);
	const [mode, setMode] = useState("");
	const appealMailTo = `mailto:report@sqwid.app?subject=%5BAPPEAL%5D%20Requesting%20manual%20review%20for%20item%20with%20id%20${collectibleInfo.positionId}&body=Feel%20like%20your%20content%20was%20misidentified%20as%20violating%20our%20policy%3F%0D%0ALet%20us%20know%20below%3A`;
	const reportMailTo = `mailto:report@sqwid.app?subject=%5BREPORT%5D%20Requesting%20manual%20review%20for%20item%20with%20id%20${collectibleInfo.positionId}&body=Why%20are%20you%20reporting%20this%3F%0D%0A(Add%20an%20x%20inside%20%5B%5D%20to%20check%20it%2C%20for%20example%2C%20%5Bx%5D%20This%20content%20is%20spam)%0D%0A%0D%0A%5B%5D%20This%20content%20is%20spam%0D%0A%5B%5D%20This%20content%20should%20be%20marked%20as%20explicit%0D%0A%5B%5D%20This%20content%20is%20abusive%0D%0A%5B%5D%20This%20content%20promotes%2Fadvocates%20harm%2Fsuicide%2Flethal%20violence%0D%0A%5B%5D%20This%20content%20infringes%20upon%20my%20copyright%0D%0A%5B%5D%20Other%20%0D%0A%0D%0AOther%20(optional)%3A%20%3CFill%20this%20only%20if%20you've%20checked%20the%20%22other%22%20option%3E%0D%0A%0D%0ARemarks%20(optional)%3A%20%3CAnything%20else%20you%20want%20to%20mention%3E`;
	useEffect(() => {
		if (
			collectibleInfo.approved === false &&
			auth?.evmAddress === collectibleInfo.creator.address
		) {
			setMode("Appeal");
		} else if (
			collectibleInfo.approved === true &&
			![
				collectibleInfo.creator.address,
				collectibleInfo.owner.address,
			].includes(auth?.evmAddress)
		) {
			setMode("Report");
		}
		//eslint-disable-next-line
	}, []);
	return (
		<>
			{mode && mode.length !== 0 && (
				<BtnContainer>
					<m.a
						whileHover={{
							y: -2.5,
						}}
						whileTap={{
							scale: 0.95,
						}}
						href={mode === "Report" ? reportMailTo : appealMailTo}
						title={mode}
						className={`btn--dark btn--dark__${mode.toLowerCase()}`}
					>
						<Icon type={mode} />
						<span>{mode}</span>
					</m.a>
				</BtnContainer>
			)}
		</>
	);
};

const MetadataSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	const url = getInfuraURL(collectibleInfo?.meta?.uri);
	return (
		<HTMLLinkWrapper target="_blank" rel="noopener noreferrer" href={url}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4V6zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4z"></path>
				<path d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3z"></path>
			</svg>
			<span>Metadata</span>
		</HTMLLinkWrapper>
	);
};

const ScanSection = () => {
	// https://reefscan.com/contract/0x5043dFAc2D67A381A6315ce9097F37954eCCCc2f
	const { collectibleInfo } = useContext(CollectibleContext);
	const url = `${constants.APP_SCAN_BASE_URL}/contract/${collectibleInfo?.meta?.tokenContract}`;
	return (
		<HTMLLinkWrapper target="_blank" rel="noopener noreferrer" href={url}>
			<ReefIcon />
			<span>Token Contract</span>
		</HTMLLinkWrapper>
	);
};

const IPFSSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	const url = getInfuraURL(collectibleInfo?.meta?.media);
	return (
		<HTMLLinkWrapper target="_blank" rel="noopener noreferrer" href={url}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor">
				<path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path>
			</svg>
			<span>Media on IPFS</span>
		</HTMLLinkWrapper>
	);
};

const ItemIdSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	return (
		<TextWrapper>
			<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="m21 7.702-8.5 4.62v9.678c1.567-.865 6.379-3.517 7.977-4.399.323-.177.523-.519.523-.891zm-9.5 4.619-8.5-4.722v9.006c0 .37.197.708.514.887 1.59.898 6.416 3.623 7.986 4.508zm-8.079-5.629 8.579 4.763 8.672-4.713s-6.631-3.738-8.186-4.614c-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-8.093 4.564-8.093 4.564z"/>
			</svg>
			<span>{collectibleInfo.itemId}</span>
			<div>
				Marketplace Item ID
			</div>
		</TextWrapper>
	);
};

const TokenIdSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	return (
		<TextWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 26 26">
				<path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111l-9.707 16.18c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472l-9.707-16.18c-.446-.741-1.205-1.111-1.966-1.111z"/>
			</svg>
			<span>{collectibleInfo.tokenId}</span>
			<div>
				NFT Token ID
			</div>
		</TextWrapper>
	);
};

const PositionIdSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	return (
		<TextWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 26 26">
				<path d="M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z"/>
			</svg>
			<span>{collectibleInfo.positionId}</span>
			<div>
				Marketplace Position ID
			</div>
		</TextWrapper>
	);
};

// const VolumeSection = () => {
// 	const { collectibleInfo } = useContext(CollectibleContext);
// 	return (
// 		<StatContainer>
// 			<StatName>Volume</StatName>
// 			<Price>
// 				<ReefIcon centered size={24} />{" "}
// 				<span>{numberSeparator(collectibleInfo.stats?.volume || 0)}</span>
// 			</Price>
// 		</StatContainer>
// 	);
// };

const DetailsSection = () => {
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	useEffect (() => {
		const fetchData = async () => {
			if (!collectibleInfo.stats) {
				const data = await fetchCollectibleStats (collectibleInfo.itemId);
				setCollectibleInfo ({
					...collectibleInfo,
					stats: data,
				});
			}
		}
		fetchData ();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectibleInfo.itemId]);

	return (
		<LazyMotion features={domAnimation}>
			<Wrapper>
				<Container>
					<LinksContainer>
						<MetadataSection />
						<ScanSection />
						<IPFSSection />
					</LinksContainer>
					<StatusContainer>
						<StatusSection />
					</StatusContainer>
				</Container>
				<MiddleContainer>
					<LinksContainer>
						<TokenIdSection />
						<ItemIdSection />
						<PositionIdSection />
					</LinksContainer>
				</MiddleContainer>
				<MiddleContainer>
					{collectibleInfo.stats ? (
						<LinksContainer>
							<StatContainer>
								<StatName>Volume</StatName>
								<Price>
									<ReefIcon centered size={24} />{" "}
									<span>{collectibleInfo.stats ? numberSeparator(collectibleInfo.stats?.volume || 0) : <LoadingIcon/>}</span>
								</Price>
							</StatContainer>
							<StatContainer>
								<StatName>Average sale</StatName>
								<Price>
									<ReefIcon centered size={24} />{" "}
									<span>{collectibleInfo.stats ? numberSeparator(collectibleInfo.stats?.average || 0) : <LoadingIcon/>}</span>
								</Price>
							</StatContainer>
							<StatContainer>
								<StatName>Last sale</StatName>
								<Price>
									<ReefIcon centered size={24} />{" "}
									<span>{collectibleInfo.stats ? numberSeparator(collectibleInfo.stats?.lastSale || 0) : <LoadingIcon/>}</span>
								</Price>
							</StatContainer>
							<StatContainer>
								<StatName># of owners</StatName>
								<Price>
									<span>{collectibleInfo.stats ? numberSeparator(collectibleInfo.stats?.owners || 0) : <LoadingIcon/>}</span>
								</Price>
							</StatContainer>
							<StatContainer>
								<StatName># of sales</StatName>
								<Price>
									<span>{collectibleInfo.stats ? numberSeparator(collectibleInfo.stats?.salesAmount || 0) : <LoadingIcon/>}</span>
								</Price>
							</StatContainer>
						</LinksContainer>
					) : <LoadingIcon/>}
				</MiddleContainer>
				<BottomContainer>
					<ReportBtn />
					<ShareBtn to="/" />
				</BottomContainer>
			</Wrapper>
		</LazyMotion>
	);
};

export default DetailsSection;
