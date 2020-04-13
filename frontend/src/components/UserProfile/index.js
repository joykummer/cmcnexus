import React from 'react'

import styled from 'styled-components'
import PacmanLoader from "react-spinners/PacmanLoader";
import Axios from '../../axios/not_authenticated';
import {CardBox} from '../../styles/GenericBoxes';
import {Table} from '../../styles/Tables'

const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
width: 1090px;
height: 100%;
background: #E5E5E5;
;`

const Rectangle = styled.div`
//position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
width: 850px;
height: 90%;
left: 0px;
top: 0px;
border: solid black 2px;

background: #FFFFFF;
opacity: 0.7;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
`;

const User = styled.div`
position: absolute;
width: 472px;
height: 56px;
left: 482px;
top: 100px;
border: solid blue 2px;

font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 56px;

color: #000000;
`;

const FirstName = styled.div`
color: #717171;
//width: 200px;
//height: 21px;
//left: 485px;
//top: 267px;
font-size: 1.5rem;
margin-bottom: 0.5rem;

padding-left: 100px;
border: red solid 2px;

font-family: Roboto;
font-style: normal;
font-weight: normal;
//font-size: 18px;
line-height: 21px;
/* identical to box height */


color: #717171;
`;


export default function UserProfile() {
return (
	<Wrapper>
		<Rectangle>
			<User>
			USER PROFILE
			</User>
			<FirstName>
				First Name
			</FirstName>

		</Rectangle>
	</Wrapper>
)
}