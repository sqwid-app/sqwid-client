import LoadingIcon from "@static/svg/LoadingIcon";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import constants from "@utils/constants"

const LoadingContainer = styled.div`
	height: ${props => props.init ? `100vh` : `70vh`};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content:center;
	h1{
		font-weight: 900;
		font-size: 2.75rem;
	}
	p{
		position:absolute;
		bottom:0;
		right:0;
		display: flex;
		align-items:center;
		justify-content:center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		font-family: var(--font-family);
		color: var(--app-container-text-primary-hover);
		font-weight: 600;
	}
`
const FullPageLoading = ({ delay, ...props }) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShow(true);
		}, delay);
		return () => {
			clearTimeout(timeout);
		};
	}, [delay]);
	useEffect(() => {
		if (props.init) {
			NProgress.configure({ showSpinner: false, easing: "ease" });
			NProgress.start();
			return () => {
				NProgress.done();
			};
		}
	});
	return (
		<>
			{show ? (
				<LoadingContainer {...props}>
					<LoadingIcon size={props.init ? 72 : 48} />
					<h1>{props.init && `${constants.APP_NAME}`}</h1>
					{(props.init && props.component) && <p><span>Preparing {props.component} </span><FadeLoaderIcon /></p>}
				</LoadingContainer >
			) : null}
		</>
	)
}

export default FullPageLoading
