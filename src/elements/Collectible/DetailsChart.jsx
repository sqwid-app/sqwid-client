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
	defaults,
	LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ZoomPlugin from "chartjs-plugin-zoom";
import { fetchCollectibleSaleHistory } from "@utils/marketplace";
import { useContext } from "react";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { format } from "date-fns";

const Utils = {
	id: "utils",
	beforeInit: function (chart) {
		const originalFit = chart.legend.fit;
		chart.legend.fit = function fit() {
			originalFit.bind(chart.legend)();
			this.height += 10;
		};
	},
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
	const { collectibleInfo, setCollectibleInfo } = useContext (CollectibleContext);

	const randomNumberInRange = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	// eslint-disable-next-line
	const getRandomData = options =>
		Array(options.size)
			.fill(0)
			.map(() => randomNumberInRange(options.min, options.max));

	const accentColor = "13, 104, 216";
	const amountColor = "255, 250, 110";
	const borderColor = "120, 121, 135";

	const options = {
		responsive: true,
		scales: {
			x: {
				ticks: {
					color: `rgba(${borderColor},1)`,
				},
			},
			y: {
				ticks: {
					color: `rgba(${borderColor},1)`,
				},
				beginAtZero: true
			},
			y1: {
				ticks: {
					color: `rgba(${borderColor},1)`,
				},
				beginAtZero: true,
				grid: {
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				},
				position: 'right',
				suggestedMax: 25
			}
		},
		plugins: {
			tooltip: {
				padding: {
					x: 12,
					y: 16,
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
					boxWidth: 8,
				},
			},
			zoom: {
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					drag: {
						enabled: true,
					},
					mode: "x",
				},
			},
		},
	};

	const [data, setData] = useState({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
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
		defaults.elements.line.borderJoinStyle = "round";
		defaults.elements.line.borderColor = `rgba(${accentColor}, 1)`;
		defaults.elements.point.borderColor = "rgba(255,255,255,1)";
		defaults.elements.point.radius = 6;
		defaults.elements.point.hoverRadius = 6;
		defaults.elements.point.hitRadius = 18;
		defaults.elements.point.borderWidth = 3;
		defaults.elements.point.hoverBorderWidth = 3;

		class ShadowLine extends LineController {
			draw() {
				super.draw(arguments);
				const { ctx } = this.chart;

				const originalStroke = ctx.stroke;
				ctx.stroke = function () {
					ctx.save();
					ctx.shadowColor = "rgba(0,0,0,1)";
					ctx.shadowBlur = 18;
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = 6;
					originalStroke.apply(this, arguments);
					ctx.restore();
				};
				LineController.prototype.draw.apply(this, arguments);
				ctx.stroke = originalStroke;
			}
		}

		ShadowLine.id = "ShadowLine";
		ShadowLine.defaults = LineController.defaults;

		ChartJS.register(ShadowLine);

		const chart = chartRef.current;
		const gradientBottomOffset = 50;

		if (!chart) return;

		let gradient = chart.ctx.createLinearGradient(
			0,
			0,
			0,
			chart.height - gradientBottomOffset
		);
		gradient.addColorStop(0, `rgba(${accentColor}, 0.75)`);
		gradient.addColorStop(0.2, `rgba(${accentColor}, 0.25)`);
		gradient.addColorStop(1, `rgba(${accentColor}, 0)`);

		let amountGradient = chart.ctx.createLinearGradient(
			0,
			0,
			0,
			chart.height - gradientBottomOffset
		);
		amountGradient.addColorStop(0, `rgba(${amountColor}, 0.75)`);
		amountGradient.addColorStop(0.2, `rgba(${amountColor}, 0.25)`);
		amountGradient.addColorStop(1, `rgba(${amountColor}, 0)`);

		// setData({
		// 	...data,
		// 	datasets: [
		// 		{
		// 			backgroundColor: gradient,
		// 			pointBackgroundColor: `rgba(${accentColor}, 1)`,
		// 			label: "Price",
		// 			data: getRandomData({
		// 				size: labels.length,
		// 				min: 0,
		// 				max: 1000,
		// 			}),
		// 		},
		// 	],
		// });

		const fetchData = async () => {
			let response;
			if (collectibleInfo.sales) response = collectibleInfo.sales;
			else response = (await fetchCollectibleSaleHistory (collectibleInfo.itemId)).sales;
			setCollectibleInfo ({
				...collectibleInfo,
				sales: response,
			});
			const labels = response.map ((item) => format (new Date (item.timestamp * 1000), "MMM dd"));
			let days = [];
			for (let i = 0; i < labels.length; i++) {
				if (days.indexOf (labels[i]) === -1) days.push (labels[i]);
			}
			let dataset = [];
			for (let i = 0; i < days.length; i++) {
				dataset[i] = {
					amounts: [],
					prices: [],
				};
				for (let j = 0; j < response.length; j++) {
					if (format (new Date (response[j].timestamp * 1000), "MMM dd") === days[i]) {
						dataset[i].amounts.push (response[j].amount);
						dataset[i].prices.push (response[j].price);
					}
				}
			}
			for (let i = 0; i < dataset.length; i++) {
				dataset[i].weightedAverage = 0;
				dataset[i].amount = dataset[i].amounts.reduce ((a, b) => a + b, 0);
				for (let j = 0; j < dataset[i].amounts.length; j++) {
					dataset[i].weightedAverage += dataset[i].amounts[j] * dataset[i].prices[j];
				}
				dataset[i].weightedAverage /= dataset[i].amount;
			}
			setData ({
				labels: days,
				datasets: [
					{
						backgroundColor: gradient,
						pointBackgroundColor: `rgba(${accentColor}, 1)`,
						label: "Average Price",
						data: dataset.map ((item) => item.weightedAverage),
						yAxisID: 'y',
					},
					{
						backgroundColor: amountGradient,
						pointBackgroundColor: `rgba(${amountColor}, 1)`,
						borderColor: `rgba(${amountColor}, 1)`,
						label: "Amount",
						data: dataset.map ((item) => item.amount),
						yAxisID: 'y1',

					}
				],
			});
		}
		fetchData();
		//eslint-disable-next-line
	}, []);

	// useEffect(() => {
		
	// 	//eslint-disable-next-line
	// }, []);

	return (
		<Chart ref={chartRef} type="ShadowLine" options={options} data={data} />
	);
};

export default DetailsChart;
