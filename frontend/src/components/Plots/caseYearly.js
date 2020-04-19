import React, {useEffect, useState} from 'react';

import Chart from '.';
import {useSelector} from 'react-redux';


export default function(props) {
	const [showChart, setShowChart] = useState(false);
	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);

	const getChart = () => ({
		type: "line",
		data: {
			labels: labels,
			datasets: [{
				label: 'Cases',
				data: data,
				backgroundColor: [
					'rgba(111,111,111,0.56)',
				],
				borderColor: [
					'rgb(111,111,111)',
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
		if (props.data) {
			setLabels(props.data.map(entry => entry.year));
			setData(props.data.map(entry => entry.cases_created));
			setShowChart(true);
		}
	}, [props.data]);


	return showChart ? <Chart chart={getChart()}/> : null;
}