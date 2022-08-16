import LoadingIcon from "@static/svg/LoadingIcon";
import SearchIcon from "@static/svg/SearchIcon";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { getInfuraURL } from "@utils/getIPFSURL";
import { briefSearchAll } from "@utils/search";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const SearchContainer = styled.div`
	position: relative;
	& input {
		font-family: var(--font-family);
		font-size: 1rem;
		font-weight: 600;
		padding: 0.75rem 1.25rem;
		padding-left: 2.5rem;
		border-radius: 1000rem;
		background: var(--app-container-bg-primary);
		color: var(--app-text);
		outline: none;
		border: none;
		max-height: 2.5rem;
		min-width: 15rem;
		&:placeholder {
			color: var(--app-container-text-primary);
		}
	}
`;

const LogoContainer = styled.div`
	display: grid;
	place-items: center;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	padding-left: 0.75rem;
	color: var(--app-container-text-primary);
`;

const ResultsContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
	margin: 0.5rem 0;
	z-index: 100;
	overflow: hidden;
	padding: 0.55rem 0;
	& > div {
		padding: 0.5rem 1rem;
		cursor: pointer;
		&:hover {
			background: var(--app-container-bg-secondary);
		}
	}
`;

const CategoryBreakerTitle = styled.span`
	// padding: 0.5rem 1rem;
	font-size: 0.9rem;
	font-weight: 700;
	color: var(--app-container-text-primary);
`;

const UserResult = styled.div`
	display: grid;
	grid-template-columns: 2rem 1fr;
	gap: 0.75rem;
	align-items: center;
	& > img {
		width: 2rem;
		height: 2rem;
		border-radius: 1000rem;
	}
`;

const UserResultText = styled.div`
	display: grid;
	gap: 0rem;
	
	& > span {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--app-text);
		line-height: 1.1rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	& > span:nth-child(2) {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--app-container-text-primary);
	}
`;


const CollectionResult = styled.div`
	display: grid;
	grid-template-columns: 2rem 1fr;
	gap: 0.75rem;
	align-items: center;
	& > span {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	& > img {
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
	}
`;

const NotFound = styled.div`
	display: grid;
	place-items: center;
	align-content: center;
	height: 100%;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 500;
	color: var(--app-container-text-primary);
	&:hover {
		background: none;
		cursor: default;
	}
`;
const CategoryBreakerContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	// height: 2rem;
	padding: 0.5rem 1rem;
	&:hover {
		background: none !important;
		cursor: default;
	}
	& > a {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--app-container-text-primary);
		text-decoration: none;
		transition: all .2s ease;
	}
	& > a:hover {
		text-decoration: underline;
		color: var(--app-text);
	}
`;

const CategoryBreaker = ({ title, to }) => {
	return (
		<CategoryBreakerContainer>
			<CategoryBreakerTitle>{title}</CategoryBreakerTitle>
			<Link to = {to}>View all</Link>
		</CategoryBreakerContainer>
	)
}

const Search = () => {
	const [searchText, setSearchText] = useState("");
	const [selected, setSelected] = useState(false);
	const [results, setResults] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const history = useHistory ();
	useEffect (() => {
		const delayDebounceFn = setTimeout(() => {
			// console.log(searchText);
			if (searchText.length) {
				setIsLoading (true);
				briefSearchAll (searchText).then (res => {
					setResults (res);
					setIsLoading (false);
				});
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchText]);
	const handleChange = e => {
		setSearchText(e.target.value);
		
	}
	const handleSubmit = e => {
		if (e.key === "Enter" && searchText.length) {
			// console.log(searchText)
		}
	};
	return (
		<>
			<SearchContainer>
				<LogoContainer>
					<SearchIcon selected={selected} />
				</LogoContainer>
				<input
					type="text"
					value={searchText}
					onChange={handleChange}
					onKeyDown={handleSubmit}
					onFocus={() => setSelected(true)}
					onBlur={() => setSelected(false)}
					placeholder={`Collection or user...`}
				></input>
				{((selected || isHovered) && searchText.length > 0) && <ResultsContainer
				onMouseOver={() => setIsHovered (true)}
				onMouseOut={() => setIsHovered (false)}>
					{isLoading ? (
						<LoadingIcon size = {32}/>
					) : (
						<>
							{results.users?.length ? (
								<>
									<CategoryBreaker
										title = "Users"
										to = {`/search/users/${searchText}`}
									/>
									{results.users.map (user => (
										<UserResult onClick={
											() => history.push (`/profile/${user.evmAddress}`)
										}>
											<img alt = "User Avatar" src={getAvatarFromId (user.evmAddress)} />
											<UserResultText>
												<span>{user.displayName}</span>
												<span>{user.evmAddress}</span>
											</UserResultText>
										</UserResult>
									))}
								</>
							) : null}
							{results.collections?.length ? (
								<>
									<CategoryBreaker
										title = "Collections"
										to = {`/search/collections/${searchText}`}
									/>
									{results.collections.map (collection => (
										<CollectionResult onClick={
											() => window.location.href = `/collections/${collection.id}`
										}>
											<img alt = "Collection" src={getInfuraURL (collection.image)} />
											<span>{collection.name}</span>
										</CollectionResult>
									))}
								</>
							) : null}
							{results.collections?.length || results.users?.length ? null : (
								<NotFound>No results found</NotFound>
							)}
						</>
					)}
					
				</ResultsContainer>}
			</SearchContainer>
		</>
	);
};

export default Search;
