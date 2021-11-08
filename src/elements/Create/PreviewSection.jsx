import FileContext from "@contexts/File/FileContext";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { LazyMotion, domAnimation } from "framer-motion"
import { createCollectible } from "@utils/createCollectible";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import Loading from "@elements/Default/Loading";
import UploadCover from "./UploadCover";

const border = css`
	border: 2px solid var(--app-container-text-primary);
	border-radius: 0.5rem;
`;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const PreviewContainer = styled.div`
	min-height: 50%;
	max-height: 75%;
	margin-top: 0.5rem;
	user-select: none;
`


const noPreview = css`
	display: grid;
	place-items:center;
`

const FilePreview = styled.div`
	${props => !props.fileType&& border};
	${noPreview}
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

const Btn = styled(BtnBaseAnimated)`
	width: 75%;
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	user-select:none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
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

const AnimBtn = ({ children, onClick,disabled }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		onClick={onClick}
		disabled={disabled}
	>{children}</Btn>
)

const PreviewSection = () => {
	const { files, fileData } = useContext(FileContext)
	const [fileURL, setFileURL] = useState("")
	const [title, setTitle] = useState("")
	const [fileType, setFileType] = useState("")
	const [buttonText, setButtonText] = useState("Create Item")
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect (() => {
		if (fileData.file){
			const { file } = fileData;
			if (file.type.startsWith ("image")) {
				setFileType ("image")
			} else if (file.type.startsWith ("video")) {
				setFileType ("video")
			} else if (file.type.startsWith ("audio")) {
				setFileType ("audio")
			}

			setFileURL (window.URL.createObjectURL (fileData.file))
		}
	//eslint-disable-next-line
	}, [fileData.file])

	useEffect(() => {
		setTitle(files.name)
	}, [files.name])

	const handleClick = () => {
		localStorage.removeItem("properties")
		setButtonText(<Loading/>)
		setIsSubmitting(true)
		if(fileData.file&&files.name.length){
			createCollectible ({...files,...fileData})
			.then(res=>{
				setButtonText ("Uploaded NFT!")
				setIsSubmitting(false)
			})
			.catch(err=>{
				// handle err
			})
			.finally(()=>{
				setTimeout(() => {
					setButtonText("Create Item")
				}, 2000);
			})
		}
		else{
			setButtonText("Create Item")
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
				{["video","audio"].includes(fileType)&&(
					<UploadCover/>
				)}
			</Group>
			<LazyMotion features={domAnimation}>
				<AnimBtn disabled={(isSubmitting)?true:false} onClick={handleClick}>{buttonText}</AnimBtn>
			</LazyMotion>
		</Wrapper>
	)
}

export default PreviewSection
