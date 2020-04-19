import React from 'react';
import styled from 'styled-components';

import {CardBox} from '../../../styles/GenericBoxes';


export const Card = styled(CardBox)`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

${props => props.space_right ? "margin-right: 10px;" : null}
${props => props.fullWidth ? "width: 100%;" : null}
`;

const TitleBox = styled.div`
padding: 10px;
border-bottom: 1px solid lightgray;
`;

const PlotBox = styled.div`
width: 100%;
padding: 20px;

display: flex;
flex-direction: row;
justify-content: center;
`;

export default function Widget (props) {
	return (
		<Card space_right={props.space_right} fullWidth={props.fullWidth}>
			<TitleBox>{props.title ? props.title : "Widget"}</TitleBox>
			<PlotBox>
				{props.children}
			</PlotBox>
		</Card>
	)
}
