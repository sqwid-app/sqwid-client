import React,{ useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Container = styled.div`
	display: flex;
	gap: 1rem;
`

const Property = styled(m.div)`
	display: flex;
	flex-direction:column;
	align-items:flex-start;
	justify-content:space-between;
	gap: 0.25rem;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	border: 0.1rem solid var(--app-container-bg-primary);
	max-width: 6rem;
	cursor: pointer;
	p{
		color:var(--app-text);
		font-weight: 900;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	h3{
		color:var(--app-container-text-primary);
		font-weight:800;
		font-size: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	label{
		width: 100%;
		cursor: pointer;
	}
`

const PropertiesSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			{collectibleInfo.properties.map(( item,index ) => (
				<LazyMotion features={domAnimation}>
					<Property
						whileHover={{
							y: -5,
							x: 0,
							scale:1.02
						}}
					>
						<label title={item.key}><h3>{item.key}</h3></label>
						<label title={item.value}><p>{item.value}</p></label>
					</Property>
				</LazyMotion>
			))}
		</Container>
	)
}

export default PropertiesSection
