import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";

const infoBtn = css`
	right: 0;
	font-size: 1rem;
`;

const Wrapper = styled.div`
	position: absolute;
	padding-top: 1.25rem;
	${props => props.type === "help" && infoBtn};
`;

const DropdownContainer = styled.div`
	background: var(--app-modal-btn-primary);
	border-radius: 0.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 0.75rem 0.5rem;
	cursor: default;
	overflow: hidden;
	min-width: 10rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
		rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
	a {
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		text-decoration: none;
		color: var(--app-text);
		white-space: nowrap;
		&:hover {
			background: var(--app-container-bg-secondary);
		}
	}
`;

const Option = styled(NavLink)``;

const Dropdown = ({ options }) => {
	return (
		<Wrapper className="dropdown-content">
			<DropdownContainer>
				{options.map(option => (
					<Option key={option.name} to={option.link}>
						{option.name}
					</Option>
				))}
			</DropdownContainer>
		</Wrapper>
	);
};

export const DropdownHelp = ({ options, isVisible }) => {
	return (
		<Wrapper type={`help`} className="dropdown-content">
			<DropdownContainer>
				{options.map(option => (
					<React.Fragment key={option.name}>
						{option.external ? (
							<a
								href={option.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{option.name}
							</a>
						) : (
							<Option to={option.link}>{option.name}</Option>
						)}
					</React.Fragment>
				))}
			</DropdownContainer>
		</Wrapper>
	);
};

export default Dropdown;
