import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SimpleBarReact from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import AuthContext from "@contexts/Auth/AuthContext";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation, m } from "framer-motion";
import axios from "axios";
import { acceptBid, cancelBid } from "@utils/marketplace";
import Loading from "@elements/Default/Loading";
import { respondTo } from "@styles/styledMediaQuery";
import { Link } from "react-router-dom";
import { getBackend } from "@utils/network";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";

const Wrapper = styled(SimpleBarReact)`
	overflow: auto;
	max-height: 16rem;
	margin-top: 1rem;
`;

const toolTip = css`
	&:before {
		content: "${props => (props.tooltip ? props.tooltip : ``)}";
		position: absolute;
		top: -50%;
		left: 0;
		transform: translateX(-0.1rem);
		color: var(--app-container-text-primary-hover);
		background: var(--app-modal-btn-primary);
		font-weight: 900;
		font-size: 0.875rem;
		border-radius: 0.25rem 0.25rem 0 0;
		opacity: 0;
		transition: opacity 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
		padding: 0.25rem 0.75rem;
		white-space: nowrap;
		display: none;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 12rem;
		border: 0.1rem solid ${props => (props.isBidder ? `red` : `none`)};
		box-shadow: rgba(0, 0, 0, 0.35) 0px -5px 15px;
	}
	&:hover {
		border-radius: 0 0.375rem 0.375rem 0.375rem;
		&:before {
			opacity: 1;
			display: block;
		}
	}
`;

const bidderContainer = css`
	border-radius: 0.375rem;
	border: 0.1rem solid red;
	cursor: pointer;
	${toolTip};
	&:first-child {
		&:before {
			top: 50%;
			transform: translate(-0.1rem, 0.1rem);
			border-radius: 0 0.25rem 0 0.25rem;
		}
		&:hover {
			border-radius: 0.375rem;
		}
	}
`;

const CardsContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	height: 4rem;
	padding: 1rem 1.25rem;
	margin: 0 0.75rem;
	margin-bottom: 0.5rem;
	gap: 1rem;
	${props => props.isBidder && bidderContainer};
`;

const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
`;

const Icon = styled.div`
	height: 1.75rem;
	width: 1.75rem;
	border-radius: 1000rem;
	outline: 0.125rem solid white;
	background-color: var(--app-background);
	background-image: url("${props => props.url && props.url}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;
const PriceInfo = styled.div`
	text-align: right;
`;

const Price = styled.div`
	font-weight: 900;
	svg {
		display: inline-block;
		vertical-align: bottom;
	}
`;

const Copies = styled.div`
	color: var(--app-container-text-primary);
`;

const Name = styled(Link)`
	color: inherit;
	font-weight: 900;
	font-size: 1.25rem;
	max-width: 20rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	cursor: pointer;
	text-decoration: none;
	${respondTo.md`
		max-width: 5rem;
	`}
`;

const AcceptContainer = styled(m.a)`
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		gap: 0.25rem;
		border: 0.1rem solid var(--app-container-check);
		color: var(--app-container-check);
		font-weight: 900;
		transition: all 0.2s ease;
		min-width: 5.5rem;
		&:hover {
			color: var(--app-container-text);
			background: var(--app-container-check);
		}
	}
`;

const BidsCard = info => {
	const { auth } = useContext(AuthContext);
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const isSeller =
		auth && auth.evmAddress === collectibleInfo.owners.current.id;
	// const isSeller = true
	const isBidder = auth && auth.evmAddress === info.bidder.id && !isSeller;

	const [isLoading, setIsLoading] = useState(false);
	const { showErrorModal } = useErrorModalHelper();

	const handleAccept = () => {
		if (!isLoading) {
			setIsLoading(true);
			let history = collectibleInfo.bidsHistory;
			let index = history.findIndex(bid => bid.id === info.id);
			history.splice(index, 1);
			acceptBid(collectibleInfo.itemId, info.id)
				.then(() => {
					setIsLoading(false);
					setCollectibleInfo({
						...collectibleInfo,
						bidsHistory: history,
					});
				})
				.catch(err => {
					showErrorModal(err.response.data.error);
				});
		}
	};

	const handleCancel = () => {
		if (isBidder && !isLoading) {
			setIsLoading(true);
			let history = collectibleInfo.bidsHistory;
			let index = history.findIndex(bid => bid.id === info.id);
			history.splice(index, 1);
			cancelBid(collectibleInfo.itemId, info.id)
				.then(() => {
					setIsLoading(false);
					setCollectibleInfo({
						...collectibleInfo,
						bidsHistory: history,
					});
				})
				.catch(err => {
					showErrorModal(err.response.data.error);
				});
		}
	};
	return (
		<CardsContainer
			isBidder={isBidder}
			tooltip={isBidder && `Cancel Bid`}
			onClick={handleCancel}
		>
			{!isLoading || isSeller ? (
				<InfoContainer>
					<UserInfo>
						<Icon url={info.bidder.thumb} />
						<Name to={`/profile/${info.bidder.id}`}>
							{info.bidder.name}
						</Name>
					</UserInfo>
					<PriceInfo>
						<Price>
							<ReefIcon centered size={24} />{" "}
							<span>{numberSeparator(info.price)}</span>
						</Price>
						<Copies>{numberSeparator(info.copies)} Copies</Copies>
					</PriceInfo>
				</InfoContainer>
			) : (
				<>
					<Loading />
					Cancelling...
				</>
			)}
			{isSeller && !isBidder && (
				<LazyMotion features={domAnimation}>
					<AcceptContainer
						whileHover={{
							y: -5,
							x: 0,
						}}
						whileTap={{
							scale: 0.95,
						}}
						onClick={handleAccept}
					>
						<label title="Accept Bid">
							{!isLoading ? "Accept" : <Loading />}
						</label>
					</AcceptContainer>
				</LazyMotion>
			)}
		</CardsContainer>
	);
};

const BidsSection = () => {
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	useEffect(() => {
		// axios black magic moment
		// basically put this inside .then 👍
		const fetchData = async () => {
			const result = await axios(
				`${getBackend()}/get/r/marketplace/bids/${
					collectibleInfo.itemId
				}`
			);
			let items = result.data;
			const bidsHistory = items.sort((itemA, itemB) => {
				return Number(itemB.id) - Number(itemA.id);
			});
			// setIsLoading (false);
			setCollectibleInfo({
				...collectibleInfo,
				bidsHistory: bidsHistory,
			});
		};
		fetchData();
		//eslint-disable-next-line
	}, []);
	return (
		<Wrapper>
			{collectibleInfo.bidsHistory?.length ? (
				collectibleInfo.bidsHistory.map((item, index) => (
					<BidsCard key={index} {...item} />
				))
			) : (
				<>No bids yet...</>
			)}
		</Wrapper>
	);
};

export default BidsSection;
