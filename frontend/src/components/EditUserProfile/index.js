import React, {useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Time from "react-time";
import { useDispatch } from 'react-redux';
import { editUser } from "../../store/actions/Authentication/editUserActions";
import styled from 'styled-components';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setNavigationAction} from '../../store/actions/Navigation';
import {USERPROFILE} from '../Navigation/states';
import {EditSaveButton} from "../../styles/Buttons";
import {Container, DetailsContainer, HeaderTitle} from "../../styles/BaseContainer";


const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 100%;
background: #ebebeb;
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

export default function EditUserProfile() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const [first_name, setFirstName] = useState(user.first_name);
	const [last_name, setLastName] = useState(user.last_name);
	const [phone, setPhone] = useState(user.phone);
	const [department, setDepartment] = useState(user.department);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		dispatch(setNavigationAction(USERPROFILE));
	}, [dispatch]);

	const onClickHandler = async (e) => {
		setLoading(true)
		const data = {
			first_name: first_name,
			last_name: last_name,
			phone: phone,
			department: department,
		};
		await dispatch(editUser(data));
		setLoading(false)
		history.push(`/profile/`);
	};


return (user ?<Wrapper>
	<Container>
		<HeaderTitle>
			EDIT USER PROFILE
		</HeaderTitle>
		<DetailsContainer>
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
			{user.organisation ?
				<GeneralElements>
					<FieldName>
						Organisation
					</FieldName>
					<Column>
						<MissingElements>
							{user.organisation.name}
						</MissingElements>
					</Column>
				</GeneralElements>
				: null
			}
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
		</DetailsContainer>
		<EditSaveButton onClick={onClickHandler}>
			{loading ? <ClipLoader size={35} color={"white"}/> : "SAVE"}
		</EditSaveButton>
	</Container>
</Wrapper> : "user not found")
}
