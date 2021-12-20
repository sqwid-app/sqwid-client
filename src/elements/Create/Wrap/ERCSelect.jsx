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
	const styles = {
		control: (base, state) => ({
			...base,
			backgroundColor: "var(--app-modal-btn-primary)",
			border: "0.1rem solid var(--app-container-text-primary)",
			boxShadow: state.isFocused ? 0 : 0,
			color: "var(--app-text)",
			"&:hover": {
				boxShadow: 0,
			}
		}),
		menu: base => ({
			...base,
			backgroundColor: "var(--app-modal-btn-primary)",
			color: "var(--app-text)",
		}),
		placeholder: base => ({
			...base,
			color: "var(--app-text)"
		}),
		input: base => ({
			...base,
			color: "var(--app-text)"
		}),
		singleValue: base => ({
			...base,
			color: "var(--app-text)"
		}),
		dropdownIndicator: (base, state) => ({
			...base,
			color: (state.isSelected || state.isFocused) ? "var(--app-text)" : "var(--app-container-text-primary-hover)",
			"&:hover": {
				color: "var(--app-text)"
			}
		}),
		option: (base, state) => ({
			...base,
			color: "var(app-text)",
			backgroundColor: state.isSelected ? "var(--app-container-bg-secondary)" : "inherit",
			"&:active": {
				backgroundColor: state.isSelected ? "var(--app-theme-primary)" : "var(--app-container-text-primary)"
			}

		})
	}
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
