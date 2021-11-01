import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";
import CustomScrollbar from "@elements/Default/CustomScrollbar";
import AuthContext from "@contexts/Auth/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCloudflareURL } from "@utils/getIPFSURL";
import LoadingIcon from "@static/svg/LoadingIcon";

const Wrapper = styled.div`
	position: relative;
	margin-top: 9.5rem;
	padding: 0.5rem 0;
	flex:1;
`

const Container = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	padding: 1.5rem 0.75rem;
	padding-top: 4.5rem;
	gap: 1.25rem;
`

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	place-items:center;
`

const Title = styled.h1`
	position:fixed;
	font-weight: 800;
	font-size: 2rem;
	user-select: none;
`

const CollectionsSection = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	const userID = id?id:auth?.address
	const [cards, setCards] = useState(JSON.parse(localStorage.getItem("collections"))||[])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/api/get/collections/owner/${userID}`)
		.then((res)=>{
			localStorage.setItem("collections",JSON.stringify(res.data.collections))
			setCards(res.data.collections.map(item=>{
				return {
					src: getCloudflareURL(item.data.image),
					title:item.data.name,
					link:`${window.location.origin}/collection/${item.id}`
				}
			}))
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			setIsLoading(false)
		})
	//eslint-disable-next-line
	}, [])
	// {
	// 	src:"https://images.unsplash.com/photo-1634819875292-83e02980a99b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
	// 	title:"In me",
	// 	link:"/"
	// }
	return (
		<Wrapper>
			<CustomScrollbar autoHide>
				<Title>Collections</Title>
				{isLoading?(
						<LoadingContainer>
							<LoadingIcon/>
						</LoadingContainer>
					):(
						<Container>
							{cards.map((item,index)=>(
								<CollectionCard key={index} {...item} fullHeight={index===0&&true}/>
							))}
						</Container>
					)}
			</CustomScrollbar>
		</Wrapper>
	)
}

export default CollectionsSection
