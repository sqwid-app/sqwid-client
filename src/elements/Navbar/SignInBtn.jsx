import React, { useState } from "react";
import styled from "styled-components";
import { Init } from "@utils/connect";
import AccountSelect from "./AccountSelect";
import { LazyMotion, domAnimation, m } from "framer-motion"


const Btn = styled(m.a)`
	display: flex;
	align-items: center;
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
	cursor: pointer;
	z-index:2;
	user-select:none;
`

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		onClick={onClick}
	>{children}</Btn>
)

const SignInBtn = () => {
	const [isSelectionActive, setIsSelectionActive] = useState(false)
	const [currentAccounts, setCurrentAccounts] = useState (null);
	//eslint-disable-next-line
	// useEffect (() => {
	// 	(async () => {
	// 		let accs = await Init ();
	// 		setCurrentAccounts (accs);
	// 	}) ();
	// }, []);
	const handleClick = () => {
		(async () => {
			let accs = await Init ();
			setCurrentAccounts (accs);
		}) ();
		setIsSelectionActive(!isSelectionActive)
	}
	return (
		<LazyMotion features={domAnimation}>
			<AnimBtn onClick={handleClick}>
				Connect
			</AnimBtn>
			<AccountSelect isActive={isSelectionActive} setIsActive={setIsSelectionActive} accounts={currentAccounts}/>
		</LazyMotion>
	)
}

export default SignInBtn
