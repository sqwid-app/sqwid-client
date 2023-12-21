import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation, m } from "framer-motion";
import SimpleBarReact from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const Container = styled.div`
	display: flex;
	gap: 1rem;
	margin: 1rem 1px 1rem;
`;

const Wrapper = styled.div`
	padding-top: 0.5rem;
`;

const Property = styled(m.div)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	border: 0.1rem solid var(--app-container-bg-primary);
	max-width: 20rem;
	cursor: pointer;
	p {
		color: var(--app-text);
		font-weight: 900;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	h3 {
		color: var(--app-container-text-primary);
		font-weight: 800;
		font-size: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	label {
		width: 100%;
		cursor: pointer;
	}
`;

const Heading = styled.h3`
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
`;

// NOT COMPLETE
const ClickableProperty = ({ item }) => {
	const { collectibleInfo } = useContext(CollectibleContext);
	const handleClick = () => {
		window.open(`${window.location.origin}/collections/${collectibleInfo.collection.id}?traits[${item.trait_type.toUpperCase ()}]=${item.value.toUpperCase ()}`, "_blank");
	};

	return (
		<Property
			onClick={handleClick}
			whileHover={{
				y: -5,
				x: 0,
				scale: 1.02,
			}}
		>
			<label title={item.key}>
				<h3>{item.trait_type}</h3>
			</label>
			<label title={item.value}>
				<p>{item.value}</p>
			</label>
		</Property>
	);
};
			

const PropertiesSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	return (
		<>
			{Object.keys(collectibleInfo.meta.attributes).length !== 0 && (
				<Wrapper>
					<Heading>Properties</Heading>
					<SimpleBarReact>
						<Container>
							<LazyMotion features={domAnimation}>
								{collectibleInfo.meta.attributes.map(
									(item, index) => (
										<ClickableProperty
											key={index}
											item={item}
										/>
									)
								)}
							</LazyMotion>
						</Container>
					</SimpleBarReact>
				</Wrapper>
			)}
		</>
	);
};

export default PropertiesSection;
