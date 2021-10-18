import React from "react";
import styled from "styled-components";

const Btn = styled.a`
	display: flex;
	align-items: center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	background: hsl(168, 87%, 58%);
	color: var(--app-background);
	outline: none;
	border: none;
	height: 2.5rem;
	cursor: pointer;
`

const SignInBtn = () => {
	return (
		<Btn>
			Connect
		</Btn>
	)
}

export default SignInBtn
