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
	justify-content: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	min-width: 8rem;
	z-index: 2;
`;

// eslint-disable-next-line
const SVG = styled.svg`
	fill: var(--app-text);
	height: 2rem;
	width: 2rem;
`;

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileTap={{
			scale: 0.97,
		}}
		onClick={onClick}
	>
		{children}
	</Btn>
);

const SignInBtn = () => {
	const {
		isSelectionActive,
		setIsSelectionActive,
		currentAccounts,
		handleInit,
	} = useContext(AccountSelectContext);
	const [username, setUsername] = useState("");
	const { loading, auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.meta.name);
	}, [auth]);
	return (
		<LazyMotion features={domAnimation}>
			<AnimBtn onClick={handleInit}>
				{loading ? (
					<Loading navbar />
				) : (
					<>
						{username.length
							? // <SVG viewBox="0 0 24 24">
							  // 	<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/>
							  // </SVG>
							  `Account`
							: `Connect`}
					</>
				)}
			</AnimBtn>
			<InfoBtn />
			<AccountSelect
				isActive={isSelectionActive}
				setIsActive={setIsSelectionActive}
				accounts={currentAccounts}
			/>
		</LazyMotion>
	);
};

export default SignInBtn;
