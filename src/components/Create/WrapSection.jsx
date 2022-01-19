import Address from "@elements/Create/Wrap/Address";
import Token from "@elements/Create/Wrap/Token";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { domAnimation, LazyMotion } from "framer-motion";
import ERCSelect from "@elements/Create/Wrap/ERCSelect";
import { wrap } from "@utils/wrapping";

const Wrapper = styled.div`
	display: grid;
	place-items:center;
	height: 100%;
`

const Container = styled.div`
	display: grid;
	gap: 2rem;
	width: 33vw;
`

const Btn = styled(BtnBaseAnimated)`
	width: 10rem;
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

const ButtonContainer = styled.div`
	width: 100%;
	display: grid;
	place-items: center;
	margin-top: 2rem;
`

const AnimBtn = ({ children, onClick, disabled }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		whileHover = {{
			y:-5,
			x:0
		}}
		onClick={onClick}
		disabled={disabled}
	>{children}</Btn>
)

const WrapSection = () => {
	const [wrapDetails, setWrapDetails] = useState({
		address: "",
		token: "",
		erc:"erc721",
	});
	const [ disabled, setDisabled ] = useState(true);
	useEffect(()=>{
		if (wrapDetails.address.length !== 0 && wrapDetails.token.length !== 0) {
			return setDisabled(false)
		}
		return setDisabled(true)
	},[wrapDetails])

	const handleClick = () => {
		wrap (wrapDetails.address, wrapDetails.erc, wrapDetails.token).then (() => {
			console.log ('done');
		});
	}
	return (
		<Wrapper>
			<Container>
				<Address
					wrapDetails={wrapDetails}
					setWrapDetails={setWrapDetails}
				/>
				<Token
					wrapDetails={wrapDetails}
					setWrapDetails={setWrapDetails}
				/>
				<ERCSelect
					wrapDetails={wrapDetails}
					setWrapDetails={setWrapDetails}
				/>
				<ButtonContainer>
					<LazyMotion features={domAnimation}>
						<AnimBtn disabled={disabled} onClick = {handleClick} >Wrap</AnimBtn>
					</LazyMotion>
				</ButtonContainer>

			</Container>
		</Wrapper>
	)
}

export default WrapSection
