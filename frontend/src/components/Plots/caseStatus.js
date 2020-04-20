import React, {useEffect, useState} from 'react';

import Chart from '.';


export default function(props) {
	const [showChart, setShowChart] = useState(false);
	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);

	const getChart = () => ({
		type: "pie",
		data: {
			labels: labels,
			datasets: [{
				label: 'Cases',
				data: data,
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
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
			cutoutPercentage: 50,
			legend: {position: 'right',},
			responsive: false,
			maintainAspectRatio:true
		},
	});

	useEffect(() => {
		if (props.data) {
			setLabels(props.data.map(entry => entry.status));
			setData(props.data.map(entry => entry.count));
			setShowChart(true);
		}
	}, [props.data]);


	return showChart ? <Chart chart={getChart()}/> : null;
}