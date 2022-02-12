import { respondTo } from "@styles/styledMediaQuery"
import styled from "styled-components"

export const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	max-width: 90rem;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1{
			padding-left: 3rem;
		}
	`}
`

export const Container = styled.div`
	width: 100%;
	height: 100%;
`