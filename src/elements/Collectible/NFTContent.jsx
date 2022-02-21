import React, { useContext, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import Plyr from "@elements/Default/Plyr";
import "@styles/plyr.css";
import { CSSTransition } from 'react-transition-group';
import { getCloudflareURL, getDwebURL } from "@utils/getIPFSURL";
import ModalComponent from "./ModalComponent";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { wipBread } from "@utils/bread";
import constants from "@utils/constants";
import { capitalize } from "@utils/textUtils";
import LoadingIcon from "@static/svg/LoadingIcon";

const Container = styled.div`
	display: grid;
	place-items: center;
	user-select: none;
	${respondTo.md`
		grid-row: 1;
	`}
`

const blur = css`
	filter: blur(2rem) brightness(0.4);
	transform: scale(1.1);
	pointer-events: none;
`

const ImageWrapper = styled.div`
	position: relative;
    max-height: 80vh;
	${props => props.fillHeight ? css`
		height: 100%;
	`: css`
		width: 100%;
	`}
	overflow: hidden;
	border-radius: 0.75rem;
	display: flex;
	flex-direction: column;
	img{
		height: 100%;
		width: 100%;
		// I cant figure it out rn so ill just leave it as cover :(
		object-fit: cover;
		/* background-image: url(${props => props.url && props.url});
		background-size:contain;
		background-repeat:no-repeat;
		background-position: center; */
		transition: filter 0.1s ease, transform 0.2s ease;
		cursor: zoom-in;
		user-select: none;
		${props => props.blur && blur}
		${respondTo.md`
			min-height: 16rem;
		`}
	}
	.utility-wrapper{
		transition: all 0.15s ease 0.075s;
		opacity: 0;
		transform: translateY(100%);
	}
	img:hover + .utility-wrapper, .utility-wrapper:hover{
		opacity: 1;
		transform: translateY(0);
	}
`

const WarningTextContainer = styled.div`
	--close-btn-dimension: 1.5rem;
	--warning-text: rgb(255 251 235);
	--warning-border: rgb(251 191 36);
	--warning-background: rgb(251 191 36 / 25%);
	${props => props.rejected && css`
		--warning-text: rgb(255 224 224);
		--warning-border: rgb(255 0 0);
		--warning-background: rgb(255 0 0 / 25%);
	`}
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	margin: 1rem;
	padding: 0.75rem 1rem;
	z-index:2;
	border-radius: 0.5rem;
	background-color: var(--warning-background);
	font-weight: 500;
	border: solid 0.125rem var(--warning-border);
	color:var(--warning-text);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px, inset rgba(0, 0, 0, 0.0.05) 0px 10px 15px -3px, inset rgba(0, 0, 0, 0.025) 0px 4px 6px -2px;
	p{
		width: calc(100% - (2 * var(--close-btn-dimension)));
	}
	b{
		display: block;
		margin-top: 0.25rem;
		font-weight: 700;
		font-size: 1rem;
	}
	svg{
		position: absolute;
		top:0;
		right: 0;
		margin:  0.75rem;
		cursor: pointer;
		fill: currentColor;
		height: var(--close-btn-dimension);
		width: var(--close-btn-dimension);
		margin-left: auto;
	}
`

//Might break with audio or something dont delete pls

// const ImageWrapper = styled.div`
// 	position: relative;
// 	width: 100%;
// 	height: 100%;
// 	overflow: hidden;
// 	display: grid;
//     place-items: center;
// 	.utility-wrapper{
// 		transition: all 0.15s ease 0.075s;
// 		opacity: 0;
// 		transform: translateY(100%);
// 	}
// 	img:hover + .utility-wrapper, .utility-wrapper:hover{
// 		opacity: 1;
// 		transform: translateY(0);
// 	}
// `

const VideoWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: grid;
	place-items: center;
	.utility-wrapper{
		transition: all 0.15s ease 0.075s;
		opacity: 0;
		transform: translateY(100%);
	}
	img:hover + .utility-wrapper, .utility-wrapper:hover{
		opacity: 1;
		transform: translateY(0);
	}
`

const center = css`
	display: grid;
	place - items: center;
	.plyr{
		border - radius: 0 0 0.25rem 0.25rem;
	}
`

const Content = styled.div`
	display: block;
	width: 100%;
	${respondTo.md`
		padding: 0;
	`}
`

const PlyrContainer = styled.div`
	width: 100%;
	display: grid;
	place-items: center;
	.plyr{
		height: ${props => props.audio ? `auto` : `100%`};
		border-radius: 0.25rem;
		video{
			max-height: 65vh;
		}
	}
		.plyr:-webkit-full-screen{
			video{
			max-height: 100%;
		}
	}
	transition: filter 0.1s ease, transform 0.2s ease;
	${props => props.blur && blur};
	${props => props.audio && center};
`

const PlyrCover = styled.div`
	background - image: url('${props => props.src && props.src}');
	background - repeat: no - repeat;
	background - size: cover;
	background - position: center;
	min-height: 24rem;
	min-width: 100%;
	border - radius: 0.25rem 0.25rem 0 0;
	${respondTo.md`
		min-height: 12rem;
	`}
`

const UtilityWrapper = styled.div`
	display:grid;
	place-items: center;
	position:absolute;
	z-index:2;
	bottom:0;
	width: 100%;
	border-radius: 0 0 0.75rem 0.75rem;
	padding: 0.5rem;
	min-height: 4rem;
	background: linear-gradient(180deg,transparent,rgba(0,0,0,0.65));
`

const UtilityContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content: center;
	gap: 1rem;
	padding: 0.75rem;
	margin: 0.75rem 0;
	border-radius: 1000rem;
`

const BtnContainer = styled.div`
	position: relative;
	.popup{
		padding-top: 0.25rem;
		position:absolute;
		font-weight: 800;
		bottom: calc( -50% - 0.125rem);
		left: 50%;
		transform: translateX(-50%);
		opacity:0;
		transition: opacity 0.2s ease 0.15s;

	}
	&:hover{
		.popup{
			opacity:1;
		}
	}
`

const ShareBtn = ({ to }) => {
	const MotionLink = m(Link)
	return (
		<BtnContainer>
			<MotionLink whileHover={{
				scale: 1.1,
			}} whileTap={{
				scale: 0.95
			}} title="Share" className="btn btn__share" to="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path></svg>
				{/* <span>Share</span> */}
			</MotionLink>
			<p className="popup">Share</p>
		</BtnContainer>
	)
}

//eslint-disable-next-line
const ReportBtn = () => {
	return (
		<BtnContainer>
			<m.div whileHover={{
				scale: 1.1,
			}} whileTap={{
				scale: 0.95
			}} title="Report" className="btn btn__report">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0 1 12 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0 1 12 4c4.411 0 8 3.589 8 8a7.954 7.954 0 0 1-1.688 4.897z"></path></svg>
				{/* <span>Report</span> */}
			</m.div>
			<p className="popup">Report</p>
		</BtnContainer >
	)
}

const HeartBtn = () => {
	const [isHearted, setIsHearted] = useState(true);
	const handleHeartClick = () => {
		setIsHearted(!isHearted)
		!isHearted && wipBread()
	}
	return (
		<BtnContainer>
			<m.div disabled={!isHearted} whileHover={{
				scale: 1.1,
			}} whileTap={{
				scale: 0.95
			}} onClick={handleHeartClick} title="Heart" className="btn btn__heart">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
				{/* <span>Report</span> */}
			</m.div>
			<p className="popup">Heart</p>
		</BtnContainer>
	)
}

const Utility = () => {
	return (
		<UtilityWrapper className="utility-wrapper">
			<LazyMotion features={domAnimation}>
				<UtilityContainer>
					<HeartBtn />
					<ShareBtn />
				</UtilityContainer>
			</LazyMotion>
		</UtilityWrapper>
	)
}

const ImageContainer = ({ title, isBlurred, setIsBlurred, ...props }) => {
	const [fillHeight, setFillHeight] = useState(false)
	const [loading, setLoading] = useState(true)
	const handleLoad = (e) => {
		setLoading(false);
		setFillHeight(e.target.height > e.target.width) //yes i used  javascript to solve a css issue 👍
	}

	return (
		<>
			<div style={{ display: !loading && "none" }}>
				<LoadingIcon size="64" />
			</div>
			<ImageWrapper style={{ display: loading && "none" }} title={title} blur={isBlurred} fillHeight={fillHeight}>
				<WarningText isBlurred={isBlurred} setIsBlurred={setIsBlurred} />
				<img alt="NFT" {...props} onLoad={handleLoad} draggable={false} />
				<Utility />
			</ImageWrapper>
		</>
	)
}

const VideoContainer = ({ data, blur }) => {
	let type = data.mimetype.split("/")[0];
	const settings = useMemo(() => ({
		type: type,
		sources: [{
			src: getDwebURL(data.media)
		}]
	}), [data.media, type])
	const options = useMemo(() => ({
		controls: [
			'play',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'fullscreen'
		],
	}), [])
	return (
		<PlyrContainer blur={blur} audio={type === "audio"}>
			<Content>
				{type === "audio" && <PlyrCover src={getCloudflareURL(data.image)} />}
				{<Plyr
					source={settings}
					options={options}
				/>}
			</Content>
		</PlyrContainer>
	)
}

const CloseBtn = () => {
	return (
		<svg role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
	)
}

const WarningText = ({ isBlurred, setIsBlurred }) => {
	const nodeRef = useRef()
	const rejected = true;

	const warningText = <p>This item isn't approved. If you're the creator and you've just minted it, please allow a few minutes for Sqwid to approve it.</p>

	const rejectedText = <>
		<p>
			This item has been automatically rejected by {capitalize(constants.APP_NAME)} Automod.</p>
		<p>If you're the creator and you think we made a mistake, please let us know by going to the <code>Details</code> tab and clicking the <code>Appeal</code> button.</p>
		<p> The feedback you provide us will help us improve the ways we keep {capitalize(constants.APP_NAME)} safe.</p>
	</>

	return (
		<CSSTransition
			in={isBlurred}
			timeout={300}
			classNames="warning"
			nodeRef={nodeRef}
			unmountOnExit
		>
			<WarningTextContainer rejected={rejected} ref={nodeRef}>
				<div onClick={() => setIsBlurred(!isBlurred)} ><CloseBtn /></div>
				{rejected ? rejectedText : warningText}
				<b> Closing this warning will unblur the media for you!</b>
			</WarningTextContainer>
		</CSSTransition >
	)
}

const NFTContent = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const [isBlurred, setIsBlurred] = useState(!collectibleInfo.approved);
	const [modalIsOpen, setModalIsOpen] = useState(false)

	/*
	Couldn't be arsed to change the value every time so two constants 👍

	const test={
				media:{
				type:"audio/mp3",
			url:"https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
		}
	}
			const test={
				media:{
				type:"video/mp4",
			url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
		}
	}
			*/
	return (
		<Container>
			{collectibleInfo.meta?.mimetype.startsWith("image") ? (
				<>
					<ImageContainer title={collectibleInfo.meta.name} onClick={() => setModalIsOpen(true)} isBlurred={isBlurred} setIsBlurred={setIsBlurred} src={getCloudflareURL(collectibleInfo.meta.media)} />
					<ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} details={{
						image: getCloudflareURL(collectibleInfo.meta.media),
						name: collectibleInfo.meta.name,
					}} />
				</>
			) : (
				<VideoWrapper>
					<WarningText isBlurred={isBlurred} setIsBlurred={setIsBlurred} />
					<VideoContainer blur={isBlurred} data={collectibleInfo.meta} />
				</VideoWrapper>
			)}
		</Container>
	)
}

export default React.memo(NFTContent)
