import React from 'react';

import CaseCategoryPlot from '../../Plots/caseCategory';
import Widget from './index';


export default function (props) {

	return (
		<Widget title={"Cases by category"}>
				<CaseCategoryPlot data={props.data}/>
		</Widget>
	)
}
