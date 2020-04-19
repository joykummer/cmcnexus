import React from 'react';

import CaseYearlyPlot from '../../Plots/caseYearly';
import Widget from './index';


export default function (props) {

	return (
		<Widget title={"Yearly cases"} fullWidth>
			<CaseYearlyPlot data={props.data}/>
		</Widget>
	)
}
