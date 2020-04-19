import React, {useEffect} from 'react';

import styled from 'styled-components';
import Chart from "chart.js";

import {CardBox} from '../../styles/GenericBoxes';


const Card = styled(CardBox)`
width: 100%;
padding: 20px;
`;

const Canvas = styled.canvas`
`;

export default function() {
	const chartRef = React.createRef();

	useEffect(() => {
		const myChartRef = chartRef.current ? chartRef.current.getContext("2d") : null;

		if (myChartRef) {
			new Chart(myChartRef, {
				type: "pie",
				data: {
					labels: ['Proposed', 'Open', 'Assigned', 'Closed', 'Rejected'],
					datasets: [{
						label: 'Cases',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					legend: {
						position: 'right',
					}
				},

			})
		}
	},[])


	return (
		<Card>
			<Canvas
				id="myChart"
				ref={chartRef}
			/>
		</Card>);
}

const fakeData = {
	"2017": 2,
	"2018": 16,
	"2019": 33,
	"2020": 76,
	"2021": 119
}