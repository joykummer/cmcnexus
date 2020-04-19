import React, {useEffect} from 'react';

import styled from 'styled-components';

import Chart from '.';
import {CardBox} from '../../styles/GenericBoxes';


const Card = styled(CardBox)`
width: 100%;
padding: 20px;
`;

export default function(props) {
	const chart = {
		type: "pie",
		data: {
			labels: props.labels,
			datasets: [{
				label: 'Cases',
				data: props.data,
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
	};

	return (
		<Card>
			<Chart chart={chart}/>
		</Card>);
}