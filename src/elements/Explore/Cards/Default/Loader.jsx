import FadeLoaderIcon from "@static/svg/FadeLoader";
import styled from "styled-components";

const LoaderContainer = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	place-items: center;
	border-top: solid 0.125rem var(--app-container-bg-primary);
	p {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 900;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	svg {
		height: 1rem;
		width: 1rem;
	}
`;

const Loader = () => {
	return (
		<LoaderContainer>
			<p>
				<span>Loading</span> <FadeLoaderIcon />
			</p>
		</LoaderContainer>
	);
};

export default Loader;
