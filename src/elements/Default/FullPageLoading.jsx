import LoadingIcon from "@static/svg/LoadingIcon";
import React, { useEffect } from "react";
import styled from "styled-components";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import FadeLoaderIcon from "@static/svg/FadeLoader";

const LoadingContainer = styled.div`
	height: ${props=>props.init?`100vh`:`70vh`};
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
const FullPageLoading = (props) => {
	useEffect(() => {
		if(props.init){
			NProgress.configure({ showSpinner: false });
			NProgress.start();
			return () => {
				NProgress.done();
			};
		}
	});
	return (
		<LoadingContainer {...props}>
			<LoadingIcon size={props.init?72:48}/>
			<h1>{props.init&&`Sqwid`}</h1>
			{(props.init&&props.component)&&<p><span>Preparing {props.component} </span><FadeLoaderIcon/></p>}
		</LoadingContainer>
	)
}

export default FullPageLoading
