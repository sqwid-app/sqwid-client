import styled from "styled-components";

const CardSectionContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(0, 16rem));
	width: 100%;
	justify-content: space-around;
	padding: 1.5rem 1.25rem;
	grid-gap: 2rem 1rem;
	overflow-x: hidden;
`;

export default CardSectionContainer;
