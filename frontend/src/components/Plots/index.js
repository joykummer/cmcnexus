import React, {useEffect} from 'react';

import Chart from "chart.js";

export default function(props) {
	const chartRef = React.createRef();
	const chartSpecification = props.chart;

	useEffect(() => {
		const myChartRef = chartRef.current ? chartRef.current.getContext("2d") : null;

		if (myChartRef && props.chart) {
			new Chart(myChartRef, chartSpecification);
		}
	}, [chartRef, chartSpecification]);


	return (<canvas ref={chartRef}/>)
}
