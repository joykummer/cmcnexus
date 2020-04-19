import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import CaseStatusWidget from './Widgets/caseStatus';
import CaseCategoryWidget from './Widgets/caseCategory';
import CaseYearlyWidget from './Widgets/caseYearly';
import {getStats} from '../../store/actions/Statistics/getStatisticsAction';
import {categoriesFunction} from '../../store/actions/Categories/categoriesAction';
import Counter from './Widgets/counter';


const Wrapper = styled.div`
  padding: 20px;
  background-color: #ebebeb;
	height: 100%;
  
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const Container = styled.div`
	height: 100%;
	max-width: 1200px;
  
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	
  overflow: auto;
`;

const Horizontal = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-around;
`;

export default function Dashboard (props) {
	const dispatch = useDispatch();
	const stats = useSelector(state => state.stats);


	useEffect(() => {
		dispatch(getStats());
		dispatch(categoriesFunction());
	}, [dispatch]);


	return (
		<Wrapper>
			{stats && stats.cases ?
				<Container>
					<Counter data={{
						total: stats.cases.total,
						open: stats.cases.by_status.find(el => el.status === "open").count,
						closed: stats.cases.by_status.find(el => el.status === "closed").count,
					}}/>
					<Horizontal>
						<CaseStatusWidget data={stats.cases.by_status} space_right/>
						<CaseCategoryWidget data={stats.cases.by_category}/>
					</Horizontal>
					<CaseYearlyWidget data={stats.cases.yearly}/>
				</Container>
				: null}
		</Wrapper>
	)
}
