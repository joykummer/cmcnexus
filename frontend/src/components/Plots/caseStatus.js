import React, {useEffect, useState} from 'react';

import Chart from '.';
import {theme} from "../../styles";


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
					...props.data.map(entry => theme.colors.status[entry.status])
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