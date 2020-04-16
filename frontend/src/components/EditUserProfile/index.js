import React, {useEffect, useState} from 'react';
import Time from "react-time";
import { useDispatch } from 'react-redux';
import { editUser } from "../../store/actions/editUserActions";

import {
  Button
} from './style';

import styled from 'styled-components';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {CardBox} from '../../styles/GenericBoxes';


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


export default function EditUserProfile() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const [first_name, setFirstName] = useState(user.first_name);
	const [last_name, setLastName] = useState(user.last_name);
	const [phone, setPhone] = useState(user.phone);
	const [department, setDepartment] = useState(user.department);

	useEffect(() => {
		dispatch(editUser());
	}, [dispatch]);

	const onClickHandler = async (e) => {
		const data = {
			first_name: first_name,
			last_name: last_name,
			phone: phone,
			department: department,
		};
		await dispatch(editUser(data));
		history.push(`/profile/`);
	};


return (user ?<Wrapper>
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
					<input
						type="text"
						placeholder={user.first_name}
						onChange={(e) => setFirstName(e.target.value)}
						value={first_name}
						required
					/>
				</Column>
			</GeneralElements>
			<GeneralElements>
				<FieldName>
					Last Name
				</FieldName>
				<Column>
					<input
						type="text"
						placeholder={user.last_name}
						onChange={(e) => setLastName(e.target.value)}
						value={last_name}
						required
					/>
				</Column>
			</GeneralElements>
			<GeneralElements>
				<FieldName>
					Phone
				</FieldName>
				<Column>
					<input
						type="tel"
						placeholder={user.phone}
						onChange={(e) => setPhone(e.target.value)}
						value={phone}
						required
					/>
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
					<input
						type="text"
						placeholder={user.department}
						onChange={(e) => setDepartment(e.target.value)}
						value={department}
						required
					/>
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
</Wrapper> : "user not found")
}
