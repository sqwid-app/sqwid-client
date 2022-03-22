export const styles = {
	control: (base, state) => ({
		...base,
		backgroundColor: "var(--app-modal-btn-primary)",
		border: "0.1rem solid var(--app-container-text-primary)",
		boxShadow: state.isFocused ? 0 : 0,
		color: "var(--app-text)",
		"&:hover": {
			boxShadow: 0,
		},
	}),
	menu: base => ({
		...base,
		backgroundColor: "var(--app-modal-btn-primary)",
		color: "var(--app-text)",
	}),
	placeholder: base => ({
		...base,
		color: "var(--app-text)",
	}),
	input: base => ({
		...base,
		color: "var(--app-text)",
	}),
	singleValue: base => ({
		...base,
		color: "var(--app-text)",
	}),
	dropdownIndicator: (base, state) => ({
		...base,
		color:
			state.isSelected || state.isFocused
				? "var(--app-text)"
				: "var(--app-container-text-primary-hover)",
		"&:hover": {
			color: "var(--app-text)",
		},
	}),
	option: (base, state) => ({
		...base,
		color: "var(app-text)",
		backgroundColor: state.isSelected
			? "var(--app-container-bg-secondary)"
			: "inherit",
		"&:active": {
			backgroundColor: state.isSelected
				? "var(--app-theme-primary)"
				: "var(--app-container-text-primary)",
		},
	}),
};
