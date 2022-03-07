import { getAbbreviatedNumber } from "@utils/getAbbreviatedNumber";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	color: var(--app-container-text-primary-hover);
`;

const IconContainer = styled.label`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 1rem;
	font-weight: 700;
`;

const SVG = styled.svg`
	fill: currentColor;
	height: 1rem;
	width: 1rem;
`;

const Followers = styled(IconContainer)``;

const Collections = styled(IconContainer)``;

const Nfts = styled(IconContainer)``;

const FollowersIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path>
			<path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path>
		</SVG>
	);
};

const CollectionsIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 6h14v2H5zm2-4h10v2H7z"></path>
		</SVG>
	);
};

const NftsIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12,15c-1.84,0-2-.86-2-1H8c0,.92.66,2.55,3,2.92V18h2V16.92c2-.34,3-1.63,3-2.92,0-1.12-.52-3-4-3-2,0-2-.63-2-1s.7-1,2-1,1.39.64,1.4,1h2A3,3,0,0,0,13,7.12V6H11V7.09C9,7.42,8,8.71,8,10c0,1.12.52,3,4,3,2,0,2,.68,2,1S13.38,15,12,15Z"></path>
			<path d="M5,2H2V4H4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V4h2V2H5ZM18,20H6V4H18Z"></path>
		</SVG>
	);
};

const MetadataContainer = ({ followers, collections, nfts }) => {
	return (
		<Container>
			<Followers title={`Followers: ${followers}`}>
				<span>{getAbbreviatedNumber(followers)}</span>
				<FollowersIcon />
			</Followers>
			<Collections title={`Collections: ${collections}`}>
				<span>{getAbbreviatedNumber(collections)}</span>
				<CollectionsIcon />
			</Collections>
			<Nfts title={`NFTs: ${nfts}`}>
				<span>{getAbbreviatedNumber(nfts)}</span>
				<NftsIcon />
			</Nfts>
		</Container>
	);
};

export default MetadataContainer;
