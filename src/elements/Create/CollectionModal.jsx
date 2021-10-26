import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
//eslint-disable-next-line
import { LazyMotion, domAnimation, m } from "framer-motion"
import CustomDropzoneModal from "./CustomDropzoneModal";
import { createCollection } from "@utils/createCollection";
import Loading from "@elements/Create/Loading";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
		opacity: 0;
	}
`

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const BackDrop = styled.div`
	position: absolute;
	top:0;
	left:0;
	bottom:0;
	right:0;
	min-height: 100vh;
	background: rgba(0, 0, 0,0.5);
	overflow:hidden;
	display: grid;
	place-items:center;
	z-index: 15;
`

const Modal = styled.div`
	padding: 2rem 1.5rem;
	background:var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index:15;
	min-width: 33vw;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${props=>!props.remove?modalEntryAnim:modalExitAnim}
`

const Title = styled.h1`
	font-size: 1rem;
	margin-bottom: 0.25rem;
`

const InputContainer = styled.input`
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	margin-bottom: 1rem;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
`

const Btn = styled(m.a)`
	display: grid;
	place-items:center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-background);
	outline: none;
	border: none;
	height: 2.5rem;
	min-width: 10rem;
	cursor: pointer;
	z-index:2;
	user-select:none;
`

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileHover={{
			y: -5,
			x: 0,
			scale:1.02
		}}
		whileTap={{
			scale:0.99
		}}
		onClick={onClick}
	>{children}</Btn>
)

const NewContainer = styled.div`
	padding: 0 1rem;
`

const BtnContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:flex-end;
	padding-top:1.5rem;
`

const Header = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`

const border = css`
	border: 2px solid var(--app-container-text-primary);
	border-radius: 0.5rem;
`

const containsPreview = css`
	display: inline-block;
`

const PreviewContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:space-around;
	padding: 0.5rem 0;
`

const PreviewText = styled.p`
	font-weight:800;
	font-size: 0.85rem;
	text-align:right;
	color: var(--app-container-text-primary);
`

const PreviewTextContainer = styled.div`
	max-width: 50%;
`

const FilePreview = styled.div`
	${containsPreview}
	overflow: hidden;
	padding: 0;

	max-width: 100%;
	min-height: auto;
	overflow: hidden;

	img{
		max-width:16rem;
		max-height:10rem;
		margin: 0 auto;
		display: block;
		${border}
	}
	p{
		padding: 1.5rem;
		padding-top: 5rem;
		padding-bottom: 5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
`;

const elemContains =  (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const New = () => {
	const [buttonText, setButtonText] = useState("Create Collection")
	const initialInfo = {
		name:"",
		description:"",
		file:null,
	}
	const [info, setInfo] = useState(initialInfo)
	const [fileURL, setFileURL] = useState("")
	useEffect (() => {
		if (info.file){
			const { file } = info;
			setFileURL (window.URL.createObjectURL (file))
		}
		else{
			setFileURL ("")
		}
	//eslint-disable-next-line
	}, [info.file])
	const handleClick = () => {
		setButtonText(<Loading bg={`var(--app-theme-primary)`}/>)
		if(info.file&&info.name.length){
			createCollection(info.file,info.name,info.description)
		}
		else{
			console.log("no 💖")
		}
		setButtonText("Created Collection!")
		setInfo(initialInfo)
		setTimeout(() => {
			setButtonText("Create Collection")
		}, 2000);
	}
	return (
		<>
			<Header>Create new collection</Header>
			<NewContainer>
				<Title>Name</Title>
				<InputContainer
					value={info.name}
					onChange = {(e)=>setInfo({...info,name:e.target.value})}
					placeholder={`e.g "Walter White collections"`}
				/>
				<Title>Description</Title>
				<InputContainer
					value={info.description}
					onChange = {(e)=>setInfo({...info,description:e.target.value})}
					placeholder={`e.g "So? I like Breaking Bad sue me"`}
				/>
				<Title>Cover Image</Title>
				{!fileURL.length?(
					<CustomDropzoneModal modal info={info} setInfo={setInfo}/>
				):(
					<PreviewContainer>
						<FilePreview>
							<img src = {fileURL} alt = {info.name} />
						</FilePreview>
						<PreviewTextContainer>
							<PreviewText>(This image will show up as your collection thumbnail)</PreviewText>
						</PreviewTextContainer>
					</PreviewContainer>
				)}
				<BtnContainer>
					<AnimBtn
						onClick={handleClick}
					>{buttonText}</AnimBtn>
				</BtnContainer>
			</NewContainer>
		</>
	)
}

const Existing = () => {
	return (
		<Title>not epic</Title>
	)
}

const CollectionModal = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive.status)
	const modalRef = useRef()
	//eslint-disable-next-line
	useEffect(() => {
		if(isActive.status===false){
			setTimeout(() => {
				setElemIsVisible(isActive.status);
			}, 200);
		}
		else{
			setElemIsVisible(isActive.status);
		}
	}, [isActive.status])

	const handleClickOutside = (e) => {
		let rect = modalRef.current.getBoundingClientRect();
		if(!elemContains(rect,e.clientX,e.clientY)){
			setIsActive({...isActive,status: false})
		}
	}
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible&&(
				<BackDrop remove={!isActive.status} onClick={handleClickOutside}>
					<Modal
						remove={!isActive.status}
						ref={modalRef}
					>
						{(() => {
							switch (isActive.type) {
								case "new":  return <New/>;
								case "choose": return <Existing/>;
								default: return "u wot m8";
							}
						})()}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default CollectionModal
