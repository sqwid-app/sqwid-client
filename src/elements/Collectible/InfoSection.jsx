//eslint-disable-next-line
import AuthContext from "@contexts/Auth/AuthContext";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import constants from "@utils/constants";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { getInfuraURL } from "@utils/getIPFSURL";
import shortenIfAddress from "@utils/shortenIfAddress";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";
import { useEffect } from "react";
import { PickCollectionModal } from "./Modals";

const Group = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	${respondTo.md`
		flex-direction: column;
		align-items:flex-start;
		gap: 1rem;
	`}
`;

const Logo = styled.div`
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url("${props => props.url && props.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const GroupContainer = styled(Container)`
	gap: 1rem;
	justify-content: center;
`;

const Heading = styled.h3`
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
	margin-bottom: 0.375rem;
	${props =>
		props.align === "right" &&
		css`
			text-align: right;
		`}
	${respondTo.md`
		text-align: left;
	`}
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	p {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	h6 {
		color: inherit;
		font-weight: 800;
		font-size: 0.75rem;
	}
	span {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`;

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1.125rem;
	div {
		max-width: 20rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-style: normal;
		${respondTo.md`
			max-width: 5rem;
		`}
	}
`;

const TextGroup = styled.div`
	display: block;
	p {
		display: inline-block;
		vertical-align: baseline;
		line-height: normal;
		padding-left: 0.5rem;
	}
`;

const CreatorSection = styled.div``;

const CollectionSection = styled.div``;

const OwnerSection = styled.div``;

const EditCollectionButton = styled.a`
	padding: 0.5rem 0rem;
	color: var(--app-container-text-primary);
	cursor: pointer;
	text-decoration: underline;
	font-size: 1rem;
	align-self: flex-end;
	:hover {
		color: var(--app-container-text-primary-hover);
	}
`;

const InfoSection = () => {
	//eslint-disable-next-line
	const { ownerID } = useParams();
	const { collectibleInfo } = useContext(CollectibleContext);
	const { auth } = useContext(AuthContext);
	const [ showPickCollectionModal, setShowPickCollectionModal ] = React.useState(false);
	// console.log (collectibleInfo);
	// use collectibleInfo.creator.royalty (0-100)
	// Do stuff to handle change uhhh idk lmao
	//
	// useEffect(() => {
	// 	let owner = ownerID ? collectibleInfo.owners.find(item=>item.id===ownerID) : (auth ? collectibleInfo.owners.find(item=>item.id===auth.address) : collectibleInfo.owners[0])
	// 	setCurrentOwner(owner?owner:collectibleInfo.owners[0])
	// //eslint-disable-next-line
	// }, [collectibleInfo, auth])
	// const [isOwner, setIsOwner] = React.useState(false);
	const [isCreator, setIsCreator] = React.useState(false);
	useEffect (() => {
		if (auth && collectibleInfo) {
			// setIsOwner (collectibleInfo.owner.address === auth.evmAddress);
			setIsCreator (collectibleInfo.creator.address === auth.evmAddress);
		}
	}, [auth, collectibleInfo]);
	return (
		<GroupContainer>
			<Group>
				<CreatorSection>
					<Heading>Creator</Heading>
					<Content>
						<Logo
							url={getAvatarFromId(
								collectibleInfo.creator.address
							)}
						/>
						<NotStyledLink
							to={`/profile/${collectibleInfo.creator.address}`}
						>
							<div>
								{shortenIfAddress(collectibleInfo.creator.name)}
							</div>
							<span>
								({collectibleInfo.creator.royalty}% royalty)
							</span>
						</NotStyledLink>
					</Content>
				</CreatorSection>
				<CollectionSection>
					<Heading align="right">Collection</Heading>
					<Content style={{
						justifyContent: "flex-end"
					}}>
						<Logo
							url = {
								getInfuraURL (
									collectibleInfo.collection.image
								)
							}
						/>
						<NotStyledLink
							to={collectibleInfo.collection.id !== constants.DEFAULT_COLLECTION_ID ? `/collections/${collectibleInfo.collection.id}` : '#'}
						>
							{collectibleInfo.collection.name}
						</NotStyledLink>
					</Content>
					{
					(isCreator && collectibleInfo.collection.id === constants.DEFAULT_COLLECTION_ID) && <Content>
						<EditCollectionButton onClick={() => setShowPickCollectionModal (true)}>
							Move to another collection
						</EditCollectionButton>
					</Content>
					}
				</CollectionSection>
			</Group>
			<Group>
				<OwnerSection>
					<Heading>Owner</Heading>
					<Content>
						<Logo
							url={getAvatarFromId(collectibleInfo.owner.address)}
						/>
						<TextGroup>
							<NotStyledLink
								to={`/profile/${collectibleInfo.owner.address}`}
							>
								<div>
									{shortenIfAddress(
										collectibleInfo.owner.name
									)}
								</div>
							</NotStyledLink>
							{/*
								add this back when we have a way to get the owner's quantity
							*/}
							{/* {(collectibleInfo.owners.total > 1) && (
								<p>and {collectibleInfo.owners.total - 1} other{!(collectibleInfo.owners.total - 1 === 1) && `s`}...</p>
							)}
							<h6>Owns {collectibleInfo.owner.quantity?.owns} of {collectibleInfo.owner.quantity?.total}</h6> */}
						</TextGroup>
					</Content>
				</OwnerSection>
			</Group>
			{ isCreator && <PickCollectionModal
				isActive={showPickCollectionModal}
				setIsActive={setShowPickCollectionModal}
			/> }
		</GroupContainer>
	);
};

export default InfoSection;
