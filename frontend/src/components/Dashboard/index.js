import React, {useEffect} from 'react';
import styled from 'styled-components';

import CasePlot from '../Plots/caseStatus';
import {getStats} from '../../store/actions/Statistics/getStatisticsAction';
import {useDispatch, useSelector} from 'react-redux';


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
	const dispatch = useDispatch();
	const stats = useSelector(state => state.stats)

	useEffect(() => {
		dispatch(getStats())
	}, [dispatch]);

	return (
		<Wrapper>
			<CasePlot labels={['Proposed', 'Open', 'Assigned', 'Closed', 'Rejected']} data={[12, 19, 3, 5, 2, 3]}/>
		</Wrapper>
	)
}
