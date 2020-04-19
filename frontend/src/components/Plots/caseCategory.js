import React, {useEffect, useState} from 'react';

import Chart from '.';
import {useSelector} from 'react-redux';


export default function(props) {
	const [showChart, setShowChart] = useState(false);
	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);
	const categories = useSelector(state => state.categories);

	const getChart = () => ({
		type: "pie",
		data: {
			labels: labels,
			datasets: [{
				label: 'Cases',
				data: data,
				backgroundColor: [
					'rgba(255, 99, 132, 0.4)',
					'rgba(54, 162, 235, 0.4)',
					'rgba(255, 206, 86, 0.4)',
					'rgba(75, 192, 192, 0.4)',
					'rgba(153, 102, 255, 0.4)',
					'rgba(255, 159, 64, 0.4)'
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
			responsive: false
		},
	});

	useEffect(() => {
		if (props.data && categories && categories.length) {
			setLabels(props.data.map(entry => categories.find(cat => cat.id === entry.categories).name));
			setData(props.data.map(entry => entry.count));
			setShowChart(true);
		}
		console.log(getChart())
	}, [props.data, categories]);


	return showChart ? <Chart chart={getChart()}/> : null;
}