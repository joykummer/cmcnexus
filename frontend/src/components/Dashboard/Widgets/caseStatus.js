import React from 'react';

import CaseStatusPlot from '../../Plots/caseStatus';
import Widget from './index';


export default function (props) {

	return (
		<Widget title={"Cases by status"} space_right={props.space_right}>
				<CaseStatusPlot data={props.data}/>
		</Widget>
	)
}
