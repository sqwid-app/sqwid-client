import LoadingIcon from "@static/svg/LoadingIcon";
import React, { useEffect } from "react";
import styled from "styled-components";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
		</LoadingContainer>
	)
}

export default FullPageLoading
