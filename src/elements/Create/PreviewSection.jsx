import FileContext from "@contexts/File/FileContext";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const PreviewContainer = styled.div`
	height:80%;
	width:100%;
	border: 2px solid var(--app-container-text-primary);
	border-radius: 1rem;
	display: grid;
	place-items:center;
	font-size: 0.9rem;
	overflow: hidden;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%), url(${props=>props.src&&props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	p{
		padding: 1.5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
	h1{
		padding: 1.5rem 1.25rem;
		margin-right: auto;
		align-self: flex-start;
		text-align:left;
		font-size: 1.75rem;
		font-weight: 800;
		max-width: 90%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`

const ImageContainer = styled.div`
	height: 100%;
	width: 100%;
`

const PreviewSection = () => {
	const { files } = useContext(FileContext)
	const [imageURL, setImageURL] = useState("")
	const [title, setTitle] = useState("")

	useEffect(() => {
		if(files.file){
			setImageURL(window.URL.createObjectURL(files.file))
		}
	}, [files.file])

	useEffect(() => {
		setTitle(files.name)
	}, [files.name])

	return (
		<PreviewContainer src={imageURL}>
			{!imageURL.length?(
				<p>
					Your preview will appear here once you upload a file
				</p>
			):(
				<h1>{title}</h1>
			)}
		</PreviewContainer>
	)
}

export default PreviewSection
