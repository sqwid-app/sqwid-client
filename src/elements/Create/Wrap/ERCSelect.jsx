import { styles } from "@styles/reactSelectStyles";
import React from "react";
import Select from "react-select";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	margin-bottom: 1rem;
`

const ERCSelect = ({ wrapDetails, setWrapDetails }) => {
	const options = [
		{ label: "erc721", value: "erc721" },
		{ label: "erc1155", value: "erc1155" },
	]
	return (
		<Container>
			<Title>Select ERC</Title>
			<Select
				options={options}
				styles={styles}
				isSearchable
				defaultValue={options[0]}
				placeholder="Select ERC"
				onChange={value => setWrapDetails({
					...wrapDetails,
					erc: value.value
				})}
			/>
		</Container>
	)
}

export default ERCSelect
