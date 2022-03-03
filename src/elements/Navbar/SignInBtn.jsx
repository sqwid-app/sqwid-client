import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AccountSelect from "./AccountSelect";
import { LazyMotion, domAnimation } from "framer-motion";
import AuthContext from "@contexts/Auth/AuthContext";
import Loading from "@elements/Default/Loading";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import InfoBtn from "./InfoBtn";
import AccountSelectContext from "@contexts/AccountSelect/AccountSelectContext";

const Btn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	z-index:2;
`

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		onClick={onClick}
	>{children}</Btn>
)

const SignInBtn = () => {
	const {
		isSelectionActive,
		setIsSelectionActive,
		currentAccounts,
		handleInit,
	} = useContext(AccountSelectContext)
	const [username, setUsername] = useState("")
	const { loading, auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.meta.name)
	}, [auth])
	return (
		<LazyMotion features={domAnimation}>
			<AnimBtn onClick={handleInit}>
				{loading ? (
					<Loading navbar />
				) : (
					<>
						{username.length ? username : `Connect`}
					</>
				)}
			</AnimBtn>
			<InfoBtn />
			<AccountSelect isActive={isSelectionActive} setIsActive={setIsSelectionActive} accounts={currentAccounts} />
		</LazyMotion>
	)
}

export default SignInBtn
