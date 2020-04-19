import React from 'react';

import styled from 'styled-components';
import {CardBox} from '../../../styles/GenericBoxes';


export const Card = styled(CardBox)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  width: 100%;
  margin: 10px;
`;

const Stack = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${props => props.right_border ? "border-right: 1px solid lightgray;" : null}
`;

const Label = styled.div`
	padding: 10px 30px 30px 30px;
`;

const Number = styled.div`
	font-weight: 500;
	font-size: 40px;
	padding: 30px 30px 0 30px;
`;

const LabelCounter = ({label, number, right_border}) => {
	return (
		<Stack right_border={right_border}>
			<Number>
				{number}
			</Number>
			<Label>
				{label}
			</Label>
		</Stack>
	)
}

export default function ({data}) {
	return (
		<Card>
			<LabelCounter label={"Total cases"} number={data.total} right_border/>
			<LabelCounter label={"Open cases"} number={data.open} right_border/>
			<LabelCounter label={"Closed cases"} number={data.closed} />
		</Card>
	)
}
