import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import AuthContext from "@contexts/Auth/AuthContext";

const Container = styled.div``

const TransactionSection = () => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.some((item)=>item.id === auth.address):null

	/*
		if owner and on sale: show current price and STOP SALE btn
		if owner and not on sale: show put on sale
		if not owner and on sale: show current price and BUY NOW btn
		if not owner and not on sale: show jack
	*/
	return (
		<Container>
			{isOwner?`yes`:`no`}
		</Container>
	)
}

export default TransactionSection
