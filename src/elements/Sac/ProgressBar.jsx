import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items:center;
	gap: 1rem;
	@property --percent {
  		syntax: "<number>";
		initial-value: 0;
		inherits: false;
	}

	@property --val {
		syntax: "<integer>";
		initial-value: 0;
		inherits: false;
	}

	p.date{
		font-size: 0.75rem;
		font-weight: 900;
		padding: 0 0.25rem;
	}

	.progress{
		&__wrapper{
			width: 100%;
			display: flex;
			align-items:center;
			justify-content:center;
			flex-direction: column;
			gap: 1rem;
		}
		&__outer{
			position: relative;
			width: 100%;
			background: var(--progress-background);
			height: 1rem;
			border-radius: 1000rem;
			box-shadow: inset 0 0.1rem 0.25rem var(--progress-shadow);
		}
		&__bar{
			position: absolute;
			width: 0%;
			height: 100%;
			background: linear-gradient(to right,var(--bar-primary) 0%,var(--bar-secondary) 100%);
			border-radius: 1000rem;
			box-shadow: 0 0.125rem 0.375rem var(--progress-shadow);
			transition: width 0.5s var(--progress-easing);
		}
	}
	.counter {
		width: 4rem;
		direction: rtl;
		font-weight: 900;
		transition: --percent 0.5s var(--progress-easing);
		--val: max(var(--percent) - 0.5, 0);
		counter-reset: val var(--val);
	}
	.counter::before {
		content: counter(val) "%";
	}
`

const DateContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:space-between;
	width:100%;
`

const getFormattedDate = (date) => {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return month + '/' + day + '/' + year;
}

const ProgressBar = ({ percent, date }) => {
	const counterRef = useRef();
	const barRef = useRef();
	let dateObject = new Date(date);
	useEffect(() => {
		barRef.current.style.width = `${percent}%`;
		counterRef.current.style.setProperty("--percent", percent);
	},[percent])
	return (
		<Container>
			<div class="progress__wrapper">
				<div
					class="progress__outer"
				>
					<div
						className="progress__bar"
						ref={barRef}
					/>
				</div>
				<DateContainer>
					<p className="date">{getFormattedDate(dateObject)}</p>
					<p className="date">{getFormattedDate(new Date(dateObject.getTime() + 86400000))}</p>
				</DateContainer>
			</div>
			<span className="counter" ref={counterRef} />
		</Container>
	)
}

export default ProgressBar
