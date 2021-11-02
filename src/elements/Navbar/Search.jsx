import SearchIcon from "@static/svg/SearchIcon";
import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
	position: relative;
	& input{
		font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
		min-width: 20rem;
		&:placeholder{
			color: var(--app-container-text-primary);
		}
	}
`

const LogoContainer = styled.div`
	display: grid;
	place-items:center;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	padding-left: 0.75rem;
	color: var(--app-container-text-primary);
`

const Search = () => {
	const [searchText, setSearchText] = useState("")
	const [selected, setSelected] = useState(false)
	const handleChange = (e) => setSearchText(e.target.value);
	const handleSubmit= (e) => {
		if (e.key === "Enter" && searchText.length){
			// console.log(searchText)
		}
	}
	return (
		<SearchContainer>
			<LogoContainer>
				<SearchIcon selected={selected}/>
			</LogoContainer>
			<input
				type="text"
				value={searchText}
				onChange={handleChange}
				onKeyDown={handleSubmit}
				onFocus={()=>setSelected(true)}
				onBlur={()=>setSelected(false)}
				placeholder={`Collection, item or user...`}
			></input>
		</SearchContainer>
	)
}

export default Search
