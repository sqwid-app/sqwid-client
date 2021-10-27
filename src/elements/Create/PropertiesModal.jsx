import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
//eslint-disable-next-line
import { LazyMotion, domAnimation, m } from "framer-motion"
import FileContext from "@contexts/File/FileContext";

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

const PropertiesContainer = styled.div``

const propertyIsFocused = css`
	box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: hsl(236deg 10% 23%);
	border-radius: 0.25rem;
`

const Property = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem 1.5rem;
	gap: 1rem;
	transition: all 0.1s ease;
	${props=>props.isFocused&&propertyIsFocused};
`

const Input = styled.input`
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
`

const Title = styled.h1`
	font-size: 1.5rem;
    margin-bottom: 1rem;
`

const Properties = () => {
	const { files, setFiles } = useContext(FileContext);
	const initialValue = JSON.parse(localStorage.getItem("properties"))||[{key:"",value:"",isFocused:true}]
	const [properties, setProperties] = useState(initialValue)
	const addItem = () => setProperties([...properties,{key:"",value:"",isFocused:false}])
	useEffect(() => {
		properties.forEach((item,index)=>{
			let isAllEmpty = Object.values({key:item.key,value:item.value}).every(x => x === null || x === '')
			if(isAllEmpty && index!==properties.length-1) {
				setProperties(properties.filter((x,y) => y!==index).map((x,y)=>(y===index)?{...x,isFocused:true}:x))
			}
		})
	//eslint-disable-next-line
	}, [properties])
	useEffect(() => {
		let isSomeEmpty = properties.some(item=>(
			Object.values({key:item.key,value:item.value}).some(x => x === null || x === '')&&true
			))
		!isSomeEmpty && addItem()
	//eslint-disable-next-line
	}, [properties])
	useEffect(() => {
		setFiles({
			...files,
			properties: properties
		})
		localStorage.setItem("properties",JSON.stringify(properties))
	//eslint-disable-next-line
	}, [properties])
	return (
		<PropertiesContainer>
			<Title>Properties</Title>
			{properties.map((item,idx)=>{
				return (
					<Property key={idx} isFocused={item.isFocused}>
						<Input
							type="text"
							value={item.key}
							placeholder="key"
							onChange={(e)=>{
								let newVal = [...properties]
								newVal[idx].key = e.target.value
								setProperties(newVal)
							}}
							onFocus={()=>{
								let newVal = [...properties]
								newVal[idx].isFocused = true
								setProperties(newVal)
							}}
							onBlur={()=>{
								let newVal = [...properties]
								newVal[idx].isFocused = false
								setProperties(newVal)
							}}
						/>
						<Input
							type="text"
							value={item.value}
							placeholder="value"
							onChange={(e)=>{
								let newVal = [...properties]
								newVal[idx].value = e.target.value
								setProperties(newVal)
							}}
							onFocus={()=>{
								let newVal = [...properties]
								newVal[idx].isFocused = true
								setProperties(newVal)
							}}
							onBlur={()=>{
								let newVal = [...properties]
								newVal[idx].isFocused = false
								setProperties(newVal)
							}}
						/>
					</Property>
				)
			})}
		</PropertiesContainer>
	)
}

const elemContains =  (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const PropertiesModal = ({ isActive, setIsActive }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const modalRef = useRef()
	//eslint-disable-next-line
	useEffect(() => {
		if(isActive===false){
			setTimeout(() => {
				setElemIsVisible(isActive);
			}, 200);
		}
		else{
			setElemIsVisible(isActive);
		}
	}, [isActive])

	const handleClickOutside = (e) => {
		let rect = modalRef.current.getBoundingClientRect();
		if(!elemContains(rect,e.clientX,e.clientY)){
			setIsActive(false)
		}
	}
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible&&(
				<BackDrop remove={!isActive} onClick={handleClickOutside}>
					<Modal
						remove={!isActive}
						ref={modalRef}
					>
						<Properties/>
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default PropertiesModal
