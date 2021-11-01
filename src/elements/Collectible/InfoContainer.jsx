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
		font-weight: 900;
		font-size: 1.125rem;
	}
`

const CreatorSection = styled.div``

const CollectionSection = styled.div``

const OwnerSection = styled.div``

const InfoContainer = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			<Group>
				<CreatorSection>
					<Heading>Creator</Heading>
					<Content>
						<Logo url={`https://avatars.dicebear.com/api/identicon/${collectibleInfo.creator}.svg`}/>
						<p>{collectibleInfo.creator}</p>
					</Content>
				</CreatorSection>
				<CollectionSection>
					<Heading>Collection</Heading>
					<Content>
						<Logo url={collectibleInfo.collection.cover}/>
						<p>{collectibleInfo.collection.name}</p>
					</Content>
				</CollectionSection>
			</Group>
			<OwnerSection>
				<Heading>Owner</Heading>
				<Content>
					<Logo url={`https://avatars.dicebear.com/api/identicon/${collectibleInfo.owners[0]}.svg`}/>
					<p>{collectibleInfo.owners[0]}</p>
				</Content>
			</OwnerSection>
		</Container>
	)
}

export default InfoContainer
