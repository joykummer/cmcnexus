import React, {useEffect} from 'react';
import Time from "react-time";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

import {
  Button
} from './style';

import styled from 'styled-components';
import {CardBox} from '../../styles/GenericBoxes';
import {setNavigationAction} from '../../store/actions/Navigation';
import {USERPROFILE} from '../Navigation/states';


const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 100%;
background: #ebebeb;
`;

const Rectangle = styled(CardBox)`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
max-width: 850px;
width: 80%;
margin: 40px;
padding: 40px;
`;

const Column = styled.div`
display: flex;
justify-content: flex-start;
width: 70%;
`;

const FieldName = styled.div`
display: flex;
justify-content: flex-start;
width: 30%;
min-width: 40px;
`;

const User = styled.div`
display: flex;
justify-content: center;
border-bottom: 3px solid #FF0000;
font-size: 35px;
line-height: 56px;
color: #000000;
padding: 0 10px;
`;

const GeneralElements = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: black;
width: 100%;
height: 22px;
margin: 10px;
font-size: 1.5rem;
`;

const MissingElements = styled.div`
color: red;
font-weight: bold;
`;

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 30px;
`;

export default function UserProfile() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		dispatch(setNavigationAction(USERPROFILE));
	}, [dispatch]);

	 const onClickHandler = () => {
    	history.push(`/profile/edit/`);
	};

return (user ?
	<Wrapper>
		<Rectangle>
			<User>
			USER PROFILE
			</User>
			<InfoWrapper>
				<GeneralElements>
					<FieldName>
							First Name
					</FieldName>
					<Column>
							{user.first_name}
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Last Name
					</FieldName>
					<Column>
							{user.last_name}
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Phone
					</FieldName>
					<Column>
							{user.phone}
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Role
					</FieldName>
					<Column>
							<MissingElements>
								{user.role}
							</MissingElements>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Organisation
					</FieldName>
					<Column>
							<MissingElements>
								{user.organisation}
							</MissingElements>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Department
					</FieldName>
					<Column>
								{user.department}
					</Column>
				</GeneralElements>
				<GeneralElements>
					<FieldName>
							Created
					</FieldName>
					<Column>
						 <div id='time'>
								<Time value={user ? user.date_joined : ""} format="DD/MM/YYYY" />
						 </div>
					</Column>
				</GeneralElements>
			</InfoWrapper>
			<Button onClick={onClickHandler}>
				Edit
			</Button>
		</Rectangle>
	</Wrapper> : "user not found"
)
}