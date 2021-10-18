import React from "react";
import styled from "styled-components";

const Btn = styled.a`
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem;
	background: hsl(168, 87%, 58%);
	color: var(--app-background);
	outline: none;
	border: none;
	max-height: 3rem;
`

const SignInBtn = () => {
	return (
		<Btn>
			Connect
		</Btn>
	)
}

export default SignInBtn
