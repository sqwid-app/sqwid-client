import React from "react";
import styled from "styled-components";
import Countdown, { zeroPad } from "react-countdown";

const TimeCard = styled.div`
	color: var(--app-text);
	background: var(--app-background-transparent);
	font-size: 1rem;
	font-weight: 900;
	text-align: center;
	border-radius: 1000rem;
	padding: 0.375rem 1rem;
	display: flex;
	align-items:center;
	gap: 0.25rem;
	width: max-content;
	box-shadow: rgba(0, 0, 0, 0.375) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;
	transition: all 0.175s cubic-bezier(0.68, -0.6, 0.32, 1.6);
	&:hover{
		font-size: 1.125rem;
		box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 6px -1px, rgba(0, 0, 0, 0.15) 0px 2px 4px -1px;
	}
	b {
		font-weight: 900;
		color: var(--app-container-text-primary-hover);
	}
	span {
		line-height: 0;
	}
`;

const renderer = ({ days, hours, minutes, seconds, props, completed }) => {
	return (
		<>
			{!completed ? (
				<TimeCard

				>
					{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}{" "}
					<b>left</b>{" "}
					<span role="img" aria-labelledby="emoji">
						⏳
					</span>
				</TimeCard>
			) : (
				<>{props.children}</>
			)}
		</>
	);
};

const Deadline = ({ time, loan }) => {
	return (
		<Countdown date={time * 1000} renderer={renderer}>
			<TimeCard>{!loan ? (
				<>
					Times up! <span role="img" aria-labelledby="emoji">⏰</span>
				</>
			) : (
				<>
					Expired! <span role="img" aria-labelledby="emoji">❌</span>
				</>
			)}</TimeCard>
		</Countdown>
	);
};

export default Deadline;
