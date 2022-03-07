import { css } from "styled-components";

const breakpoints = {
	xs: "480px",
	sm: "768px",
	md: "992px",
	lg: "1200px",
	xl: "1400px",
};

export const respondTo = Object.keys(breakpoints).reduce(
	(accumulator, label) => {
		accumulator[label] = (...args) => css`
			@media (max-width: ${breakpoints[label]}) {
				${css(...args)};
			}
		`;
		return accumulator;
	},
	{}
);

/*
	Note to future self cuz he's a dumb-ass
	This is how you use it:
	export const Component = styled.h2`
	background-color: lime;

	${respondTo.md`
		background-color: aqua;
	`}
	`;
	so when the screen width is less than `md`. it "responds to" that and changes the bg epic ok bye
	https://px8df.csb.app/
*/
