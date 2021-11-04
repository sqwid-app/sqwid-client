import AuthContext from "@contexts/Auth/AuthContext";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Group = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Logo = styled.div`
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url(${props=>props.url&&props.url});
	background-size:cover;
	background-repeat:no-repeat;
	background-position: center;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex:1 1 0;
	height: 100%;
`

const GroupContainer = styled(Container)`
	gap: 1rem;
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
	h1{
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

const NotStyledLink = styled.a`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1.125rem;
	max-width: 10rem;
	text-overflow:ellipsis;
	overflow: hidden;
	white-space:nowrap;
`

const TextGroup = styled.div`
	display: block;
	label{
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
	const { ownerID } = useParams()
	const { collectibleInfo } = useContext(CollectibleContext)
	const { auth } = useContext(AuthContext)
	const getTitleLabelText = (data) => `owned by ${data.map((item)=>item.name).join(", ")}...`
	const [currentOwner, setCurrentOwner] = useState("")

	useEffect(() => {
		let owner = ownerID ? collectibleInfo.owners.find(item=>item.id===ownerID) : (auth ? collectibleInfo.owners.find(item=>item.id===auth.address) : collectibleInfo.owners[0])
		setCurrentOwner(owner?owner:collectibleInfo.owners[0])
	//eslint-disable-next-line
	}, [collectibleInfo, auth])
	return (
		<GroupContainer>
			<Group>
				<CreatorSection>
					<Heading>Creator</Heading>
					<Content>
						<Logo url={`https://avatars.dicebear.com/api/identicon/${collectibleInfo.creator.name}.svg`}/>
						<NotStyledLink href={`${window.location.origin}/profile/${collectibleInfo.creator.id}`}>{collectibleInfo.creator.name} <span> ({collectibleInfo.royalty}% royalty)</span></NotStyledLink>
					</Content>
				</CreatorSection>
				<CollectionSection>
					<Heading>Collection</Heading>
					<Content>
						<Logo url={collectibleInfo.collection.cover}/>
						<NotStyledLink href={`${window.location.origin}/collections/${collectibleInfo.collection.id}`}>{collectibleInfo.collection.name}</NotStyledLink>
					</Content>
				</CollectionSection>
			</Group>
			<Group>
				<OwnerSection>
					<Heading>Owner</Heading>
					<Content>
						<Logo url={`https://avatars.dicebear.com/api/identicon/${currentOwner?.name}.svg`}/>
						<TextGroup>
							<NotStyledLink href={`${window.location.origin}/profile/${currentOwner?.id}`}>{currentOwner?.name}</NotStyledLink>
							{(collectibleInfo.owners.length>1)&&(
								<label title={getTitleLabelText(collectibleInfo.owners)}><p>and {collectibleInfo.owners.length-1} other{!(collectibleInfo.owners.length-1===1)&&`s`}...</p></label>
							)}
							<h1>Owns {currentOwner?.quantity?.owns} of {currentOwner?.quantity?.total}</h1>
						</TextGroup>
					</Content>
				</OwnerSection>
			</Group>
		</GroupContainer>
	)
}

export default InfoSection
