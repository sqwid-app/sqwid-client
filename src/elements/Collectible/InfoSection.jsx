//eslint-disable-next-line
import AuthContext from "@contexts/Auth/AuthContext";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { getCloudflareURL } from "@utils/getIPFSURL";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Group = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	${respondTo.md`
		flex-direction: column;
		align-items:flex-start;
		gap: 1rem;
	`}
`

const Logo = styled.div`
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url("${props => props.url && props.url}");
	background-size:cover;
	background-repeat:no-repeat;
	background-position: center;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

const GroupContainer = styled(Container)`
	gap: 1rem;
	justify-content: center;
`

const Heading = styled.h3`
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
	margin-bottom: 0.375rem;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	p{
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	h6{
		color: inherit;
		font-weight: 800;
		font-size: 0.75rem;
	}
	span{
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1.125rem;
	div{
		max-width: 20rem;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space:nowrap;
		font-style: normal;
		${respondTo.md`
			max-width: 5rem;
		`}
	}
`

const TextGroup = styled.div`
	display: block;
	p{
		display: inline-block;
		vertical-align: baseline;
		line-height: normal;
		padding-left: 0.5rem;
	}
`

const CreatorSection = styled.div``

const CollectionSection = styled.div``

const OwnerSection = styled.div``

const InfoSection = () => {
	//eslint-disable-next-line
	const { ownerID } = useParams()
	const { collectibleInfo } = useContext(CollectibleContext)

	// Do stuff to handle change uhhh idk lmao
	//
	// useEffect(() => {
	// 	let owner = ownerID ? collectibleInfo.owners.find(item=>item.id===ownerID) : (auth ? collectibleInfo.owners.find(item=>item.id===auth.address) : collectibleInfo.owners[0])
	// 	setCurrentOwner(owner?owner:collectibleInfo.owners[0])
	// //eslint-disable-next-line
	// }, [collectibleInfo, auth])
	return (
		<GroupContainer>
			<Group>
				<CreatorSection>
					<Heading>Creator</Heading>
					<Content>
						<Logo
							url={getAvatarFromId(collectibleInfo.creator.address)}
						/>
						<NotStyledLink to={`/profile/${collectibleInfo.creator.address}`}><div>{collectibleInfo.creator.name}</div>
							{/* <span> ({collectibleInfo.royalty}% royalty)</span> */}
						</NotStyledLink>
					</Content>
				</CreatorSection>
				<CollectionSection>
					<Heading>Collection</Heading>
					<Content>
						<Logo url={getCloudflareURL(collectibleInfo.collection.image)} />
						<NotStyledLink to={`/collections/${collectibleInfo.collection.id}`}>{collectibleInfo.collection.name}</NotStyledLink>
					</Content>
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
							<NotStyledLink to={`/profile/${collectibleInfo.owner.address}`}><div>{collectibleInfo.owner.name}</div></NotStyledLink>
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
		</GroupContainer>
	)
}

export default InfoSection
