import CollectibleContext from '@contexts/Collectible/CollectibleContext'
import ReefIcon from '@static/svg/ReefIcon'
import { LazyMotion, m, domAnimation } from 'framer-motion'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"

const Wrapper = styled.div`

`

const Container = styled.div`
	display: flex;
	width: 100%;
	align-items:center;
	justify-content:space-between;
	padding: 1rem 0;

`

const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	color: var(--app-container-text-primary-hover);
`

const StatusContainer = styled.div`
	display: flex;
	align-items:flex-end;
	align-self: flex-start;
	flex-direction: column;
	gap: 0.5rem;
	color: var(--app-container-text-primary-hover);
`

const LinkWrapper = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	text-decoration: none;
	color: inherit;
	transition: color 0.2s ease;
	&:hover{
		color: var(--app-text);
	}
	svg{
		width: 1.5rem;
		height: 1.5rem;
	}
	span{
		font-size: 1.25rem;
		font-weight: 800;
	}
`

const StatusWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	svg{
		width: 1.5rem;
		height: 1.5rem;
	}
	span{
		font-size: 1.25rem;
		font-weight: 800;
	}
`

const BottomContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:flex-end;
	width: 100%;
	gap: 1rem;
	margin-top: 1rem;
	border-top: solid 0.1rem var(--app-container-bg-primary);
	padding-top: 1.5rem;
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

const StatusDisplay = styled.div`
	border: 0.15rem solid hsla(var(--status-${props => props.variant}), 50%, 100%);
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
	.dot{
		color: hsla(var(--status-${props => props.variant}), 50%, 100%);
		padding-right: 0.125rem;
	}
`

const StatusSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	let status;
	switch (collectibleInfo.approved) {
		case true:
			status = 'approved';
			break;
		case false:
			status = 'rejected';
			break;
		case null:
			status = 'pending';
			break;
		default:
			status = 'error';
	}
	return (
		<StatusWrapper>
			<span>Status</span>
			<StatusDisplay variant={status}>
				<span className="dot">•</span> {status}
			</StatusDisplay>
		</StatusWrapper>
	)
}
const ShareBtn = ({ to }) => {
	const MotionLink = m(Link)
	return (
		<BtnContainer>
			<MotionLink whileHover={{
				y: -2.5,
			}} whileTap={{
				scale: 0.95
			}} title="Share" className="btn--dark btn--dark__share">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path></svg>
				{/* <span>Share</span> */}
			</MotionLink>
			<p className="popup">Share</p>
		</BtnContainer>
	)
}

const ReportBtn = () => {
	return (
		<BtnContainer>
			<m.div whileHover={{
				y: -2.5,
			}} whileTap={{
				scale: 0.95
			}} title="Report" className="btn--dark btn--dark__report">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0 1 12 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0 1 12 4c4.411 0 8 3.589 8 8a7.954 7.954 0 0 1-1.688 4.897z"></path></svg>
				<span>Report</span>
			</m.div>
		</BtnContainer >
	)
}

const MetadataSection = () => {
	return (
		<LinkWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4V6zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4z"></path><path d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3z"></path></svg>
			<span>Metadata</span>
		</LinkWrapper>
	)
}

const ScanSection = () => {
	return (
		<LinkWrapper>
			<ReefIcon />
			<span>ReefScan</span>
		</LinkWrapper>
	)
}

const IPFSSection = () => {
	return (
		<LinkWrapper>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" ><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>
			<span>IPFS</span>
		</LinkWrapper>
	)
}

const DetailsSection = () => {
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
				<BottomContainer>
					<ReportBtn />
					<ShareBtn to="/" />
				</BottomContainer>
			</Wrapper>
		</LazyMotion>
	)
}

export default DetailsSection