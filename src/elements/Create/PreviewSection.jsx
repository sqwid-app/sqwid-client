import FileContext from "@contexts/File/FileContext";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"
import { uploadNFT } from "@utils/uploadNFT";

const border = css`
	border: 2px solid var(--app-container-text-primary);
	border-radius: 0.5rem;
`;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const PreviewContainer = styled.div`
	height: 75%;
	max-height: 75%;
	margin-top: 0.5rem;
	user-select: none;
`


const noPreview = css`
	display: grid;
	place-items:center;
`

const containsPreview = css`
	display: inline-block;
`

const FilePreview = styled.div`
	${props => !props.fileType&& border};
	${props=>!props.fileType?noPreview:containsPreview}
	overflow: hidden;
	padding: 0;

	max-width: 100%;
	min-height: ${props=>!props.fileType?`100%`:`auto`};
	overflow: hidden;

	img{
		max-width:100%;
		max-height:20rem;
		margin: 0 auto;
		display: block;
		${border}
	}
	video{
		max-width:100%;
		max-height:16rem;
		margin: 0 auto;
		display: block;
		object-fit: cover;
		${border}
	}
	audio{
		max-width:100%;
		max-height:100%;
		margin: 0 auto;
		display: block;
	}
	p{
		padding: 1.5rem;
		padding-top: 5rem;
		padding-bottom: 5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
`;

const Btn = styled(m.a)`
	width: 75%;
	display: grid;
	place-items: center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-background);
	outline: none;
	border: none;
	cursor: pointer;
	user-select:none;
`

const Group = styled.div`
	height: 100%;
`

const Wrapper = styled.div`
	display:flex;
	flex-direction: column;
	align-items:center;
	gap:1rem;
`

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		onClick={onClick}
	>{children}</Btn>
)

const PreviewSection = () => {
	const { files } = useContext(FileContext)
	const [fileURL, setFileURL] = useState("")
	const [title, setTitle] = useState("")
	const [fileType, setFileType] = useState("")

	useEffect (() => {
		if (files.file){
			const { file } = files;
			if (file.type.startsWith ("image")) {
				setFileType ("image")
			} else if (file.type.startsWith ("video")) {
				setFileType ("video")
			} else if (file.type.startsWith ("audio")) {
				setFileType ("audio")
			}

			setFileURL (window.URL.createObjectURL (files.file))
		}
	//eslint-disable-next-line
	}, [files.file])

	useEffect(() => {
		setTitle(files.name)
	}, [files.name])

	const handleClick = () => {
		if(files.file&&files.name.length){
			uploadNFT(files.file,files.name,files.description)
			// createCollection(files.file,files.name,files.description);
		}
		else{
			console.log("no 💖")
		}
	}

	return (
		<Wrapper>
			<Group>
				<Title>Preview</Title>
				<PreviewContainer>
					{!fileURL.length?(
						<FilePreview>
							<p>
								Your preview will appear here once you upload a file
							</p>
						</FilePreview>
					):(
						<FilePreview fileType = { fileType } gradient={["video","image"].includes(fileType)}>
							{ fileType === "image" ? (
								<img src = { fileURL } alt = { title } />
							) : fileType === "video" ? (
								<video controls src = { fileURL } alt = { title } />
							) : fileType === "audio" ? (
								<audio controls src = { fileURL } alt = { title } />
							) : null}
						</FilePreview>
					)}
				</PreviewContainer>
			</Group>

			<LazyMotion features={domAnimation}>
				<AnimBtn onClick={handleClick}>Create Item</AnimBtn>
			</LazyMotion>
		</Wrapper>
	)
}

export default PreviewSection
