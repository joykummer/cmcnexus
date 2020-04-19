import React from 'react';
import styled from 'styled-components';

import CasePlot from '../Plots/caseStatus';


const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  background-color: #ebebeb;
  
  padding: 20px;
`;

export default function Dashboard (props) {

	return (
		<Wrapper>
			<CasePlot/>
		</Wrapper>
	)
}
