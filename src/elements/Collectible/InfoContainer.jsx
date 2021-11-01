import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import React, { useContext } from "react";
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
	gap: 1.5rem;
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

const InfoContainer = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const getTitleLabelText = (data) => `owned by ${data.map((item)=>item.name).join(", ")}...`
	return (
		<Container>
			<Group>
				<CreatorSection>
					<Heading>Creator</Heading>
					<Content>
						<Logo url={`https://avatars.dicebear.com/api/identicon/${collectibleInfo.creator.name}.svg`}/>
						<NotStyledLink href={`${window.location.origin}/profile/${collectibleInfo.creator.id}`}>{collectibleInfo.creator.name}</NotStyledLink>
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
			<OwnerSection>
				<Heading>Owner</Heading>
				<Content>
					{(()=>console.log(collectibleInfo))()}
					<Logo url={`https://avatars.dicebear.com/api/identicon/${collectibleInfo.owners[0]?.name}.svg`}/>
					<TextGroup>
						<NotStyledLink href={`${window.location.origin}/profile/${collectibleInfo.owners[0]?.id}`}>{collectibleInfo.owners[0]?.name}</NotStyledLink>
						{(collectibleInfo.owners.length>1)&&(
							<label title={getTitleLabelText(collectibleInfo.owners)}><p>and {collectibleInfo.owners.length-1} other{!(collectibleInfo.owners.length-1===1)&&`s`}...</p></label>
						)}
					</TextGroup>
				</Content>
			</OwnerSection>
		</Container>
	)
}

export default InfoContainer
