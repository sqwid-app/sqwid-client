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

	.progress{
		&__wrapper{
			width: 100%;
			display: flex;
			align-items:center;
			justify-content:center;
			gap: 1rem;
		}
		&__outer{
			position: relative;
			width: 100%;
			background: var(--progress-background);
			height: 1rem;
			border-radius: 1000rem;
			box-shadow: inset 0 0.125rem 0.375rem var(--progress-shadow);
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

const ProgressBar = ({ percent }) => {
	const counterRef = useRef();
	const barRef = useRef();
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
						class="progress__bar"
						ref={barRef}
					/>
				</div>
			</div>
			<span class="counter" ref={counterRef} />
		</Container>
	)
}

export default ProgressBar
