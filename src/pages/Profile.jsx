import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProfileSection from "@components/Profile/ProfileSectionRedesign";
import AuthContext from "@contexts/Auth/AuthContext";
import NotFound from "./NotFound";
import { Prompt } from "react-router-dom";
import styled from "styled-components";
import { respondTo } from "@styles/styledMediaQuery";
import Navbar from "@components/Default/Navbar";
import Container from "@elements/Default/Container";
import useCheckJWT from "@utils/useCheckJWT";

const MarginDiv = styled.div`
	margin-top: 6rem;
	${respondTo.md`
		margin-top:4rem;
	`}
`;

const Wrapper = ({ children, landing }) => {
	return (
		<>
			<Navbar />
			<Container landing={landing}>
				<MarginDiv landing={landing}>{children}</MarginDiv>
			</Container>
		</>
	);
};

const Profile = () => {
	const { auth } = useContext(AuthContext);
	const { id } = useParams();
	const { pathname } = useLocation();
	useCheckJWT(id);
	return (
		<>
			{id || auth ? (
				<Wrapper key={pathname}>
					<ProfileSection />
					<Prompt
						message={() => {
							localStorage.removeItem("collections");
							return true;
						}}
					/>
				</Wrapper>
			) : (
				<NotFound />
			)}
		</>
	);
};

export default Profile;
