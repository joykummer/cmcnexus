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


const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
background: #E5E5E5;
;`

const Rectangle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 850px;
height: 90%;
left: 0px;
top: 0px;
background: #FFFFFF;
opacity: 0.7;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
`;

const Column = styled.div`
display: flex;
justify-content: flex-end;
width: 50%;
float: left;
flex: 50%;
//height: 90%;
left: 0px;
top: 0px;
//background: #FFFFFF;
opacity: 0.7;
border-radius: 5px;
`;

const MiniTab = styled.div`
width: 70%;
`;

const User = styled.div`
position: absolute;
margin-left: 237px;
margin-right: 237px;
width: 375px;
//height: 56px;
top: 100px;
border-bottom: 3px solid #FF0000;
justify-content: center;
font-family: Arial;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 56px;
color: #000000;
`;

const GeneralElements = styled.div`
display: flex;
color: black;
//width: 200px;
//height: 21px;
//left: 485px;
//top: 267px;
font-size: 1.5rem;
margin-bottom: 1rem;
font-family: Arial;
font-style: normal;
font-weight: normal;
//font-size: 18px;
line-height: 21px;
/* identical to box height */
justify-content: center;
`;

const MissingElements = styled.div`
color: red;
font-weight: bold;
;`


export default function EditUserProfile() {
	const user = useSelector(state => state.auth.user)
	const history = useHistory()

	const [first_name, setFirstName] = useState(user.first_name);
  	const [last_name, setLastName] = useState(user.last_name);
  	const [phone, setPhone] = useState(user.phone);
  	const [department, setDepartment] = useState(user.department);
  	const dispatch = useDispatch()

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
  }


return (user ?
	<Wrapper>
		<Rectangle>
			<User>
			USER PROFILE
			</User>
				<GeneralElements>
					<Column>
						<MiniTab>
								First Name
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<input
								type="text"
								placeholder={user.first_name}
								onChange={(e) => setFirstName(e.target.value)}
          						value={first_name}
          						required
							/>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Last Name
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<input
								type="text"
								placeholder={user.last_name}
								onChange={(e) => setLastName(e.target.value)}
          						value={last_name}
          						required
							/>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Phone
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<input
								type="tel"
								placeholder={user.phone}
								onChange={(e) => setPhone(e.target.value)}
          						value={phone}
          						required
							/>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Role
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<MissingElements>
          						{user.role}
							</MissingElements>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Organisation
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<MissingElements>
          						{user.organisation}
							</MissingElements>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Department
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							<input
								type="text"
								placeholder={user.department}
								onChange={(e) => setDepartment(e.target.value)}
          						value={department}
          						required
							/>
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Created
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							 <div id='time'>
              					<Time
									value={user.date_joined}
									titleFormat="YYYY/MM/DD HH:mm" relative
								/>
							 </div>
						</MiniTab>
					</Column>
				</GeneralElements>
			<Button onClick={onClickHandler}>
				SUBMIT
			</Button>
		</Rectangle>
	</Wrapper> : "user not found"
)
}