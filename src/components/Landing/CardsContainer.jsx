import React from "react";
import styled from "styled-components";
import NFTCard from "@elements/Landing/NFTCard";

const Wrapper = styled.div`
	padding: 0 2rem;
`

const Cards = styled.div`
	display: grid;
	grid-template-rows: repeat(2, minmax(0, 1fr));
	grid-auto-flow: column;
	gap: 1.5rem;
	padding-right: 4rem;
	height: 100%;
`

const CardsContainer = () => {
	const cards = [{
		src:"https://images.unsplash.com/photo-1634498948540-3d4a2ec4d007?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1072&q=80",
		title:"idkNFT",
		author:"idts69"
	},{
		src:"https://images.unsplash.com/photo-1634425101299-65e872cdbca6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80",
		title:"whatToNFT",
		author:"plskmn22"
	},{
		src:"https://images.unsplash.com/photo-1634370058500-ebaeece3e395?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80",
		title:"writeHereNFT",
		author:"okepic420"
	}]
	return (
		<Wrapper>
			<Cards>
				{cards.map((item,index)=>(
					<NFTCard key={index} {...item} fullHeight={index===0&&true}/>
				))}
			</Cards>
		</Wrapper>
	)
}

export default CardsContainer
