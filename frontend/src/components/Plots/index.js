import React, {useEffect} from 'react';

import Chart from "chart.js";
import styled from 'styled-components';

const Canvas = styled.canvas`
width: 100%;
`;

export default function(props) {
	const chartRef = React.createRef();
	const chartSpecification = props.chart;

	useEffect(() => {
		const myChartRef = chartRef.current ? chartRef.current.getContext("2d") : null;

		if (myChartRef && chartSpecification) {
			new Chart(myChartRef, chartSpecification);
		}
	}, [chartRef, chartSpecification]);


	return (
		<Canvas ref={chartRef}/>
	);
}
