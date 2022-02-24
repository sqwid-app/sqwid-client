import React, { useEffect, useRef, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	Filler,
	defaults
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ZoomPlugin from "chartjs-plugin-zoom";

const Utils = {
	id: "utils",
	beforeInit: function (chart) {
		const originalFit = chart.legend.fit;
		chart.legend.fit = function fit() {
			originalFit.bind(chart.legend)();
			this.height += 10;
		};
	}
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	Filler,
	ZoomPlugin,
	Utils
);

const DetailsChart = () => {
	const chartRef = useRef();

	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July"
	];

	const randomNumberInRange = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	const getRandomData = (options) =>
		Array(options.size)
			.fill(0)
			.map(() => randomNumberInRange(options.min, options.max));

	const accentColor = "13, 104, 216";
	const borderColor = "120, 121, 135";

	defaults.animation.easing = "easeOutQuart";
	defaults.animation.duration = 750;
	defaults.font.family = `"Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
	defaults.font.size = 16;
	defaults.font.weight = 800;
	defaults.scale.grid.borderColor = `rgb(${borderColor})`;
	defaults.scale.grid.borderWidth = 4;
	defaults.scale.grid.borderDash = [6];
	defaults.scale.grid.color = `rgba(${borderColor},0.125)`;
	defaults.elements.line.fill = "start";
	defaults.elements.line.tension = 0.5;
	defaults.datasets.line.borderColor = `rgba(${accentColor}, 1)`;
	defaults.datasets.line.pointBackgroundColor = `rgba(${accentColor}, 1)`;
	defaults.datasets.line.hoverPointBackgroundColor = `rgba(${accentColor}, 1)`;
	defaults.datasets.line.pointBorderColor = "rgba(255,255,255,1)";

	// defaults = {
	// 	...defaults,
	// 	animation: {
	// 		easing: "easeOutBounce"
	// 	},
	// 	font: {
	// 		family: `"Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
	// 		size: 16,
	// 		weight: "800"
	// 	},
	// 	scale: {
	// 		grid: {
	// 			borderColor: `rgb(${borderColor})`,
	// 			borderWidth: 4,
	// 			borderDash: [6],
	// 			color: `rgba(${borderColor},0.125)`
	// 		}
	// 	},
	// 	elements: {
	// 		line: {
	// 			fill: "start",
	// 			tension: 0.5
	// 		},
	// 		point: {
	// 			radius: 6,
	// 			hoverRadius: 6,
	// 			borderWidth: 3,
	// 			hoverBorderWidth: 3
	// 		}
	// 	},
	// 	datasets: {
	// 		line: {
	// 			borderColor: `rgba(${accentColor}, 1)`,
	// 			pointBackgroundColor: `rgba(${accentColor}, 1)`,
	// 			hoverPointBackgroundColor: `rgba(${accentColor}, 1)`,
	// 			pointBorderColor: "rgba(255,255,255,1)"
	// 		}
	// 	}
	// }

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					color: `rgba(${borderColor},1)`,
				}
			},
			y: {
				ticks: {
					color: `rgba(${borderColor},1)`,
				}
			},
		},
		plugins: {
			tooltip: {
				padding: {
					x: 12,
					y: 16
				},
				backgroundColor: "hsla(240, 10%, 16%,0.9)",
				borderColor: `rgb(${borderColor})`,
				borderWidth: 2,
				boxPadding: 8,
				bodyColor: "hsl(240, 6%, 75%)",
			},
			legend: {
				position: "top",
				align: "end",
				labels: {
					pointStyle: "circle",
					usePointStyle: true,
					boxWidth: 8
				}
			},
			zoom: {
				zoom: {
					wheel: {
						enabled: true
					},
					pinch: {
						enabled: true
					},
					drag: {
						enabled: true
					},
					mode: "x"
				}
			}
		}
	};

	const [data, setData] = useState({
		labels,
		datasets: []
	});

	useEffect(() => {
		const chart = chartRef.current;
		const gradientBottomOffset = 50;

		if (!chart) return;

		let gradient = chart.ctx.createLinearGradient(
			0,
			0,
			0,
			chart.height - gradientBottomOffset
		);
		gradient.addColorStop(0, `rgba(${accentColor}, 0.5)`);
		gradient.addColorStop(0.2, `rgba(${accentColor}, 0.25)`);
		gradient.addColorStop(1, `rgba(${accentColor}, 0)`);

		setData({
			...data,
			datasets: [
				{
					backgroundColor: gradient,
					label: "Price",
					data: getRandomData({
						size: labels.length,
						min: 0,
						max: 1000
					})
				}
			]
		});
		//eslint-disable-next-line
	}, []);

	// useEffect(() => {
	// 	console.log(data)
	// 	//eslint-disable-next-line
	// }, [])

	return <Chart ref={chartRef} type="line" options={options} data={data} />;
};

export default DetailsChart
