import React from 'react';
import NavigationBar from '../NavigationBar';
import styled from 'styled-components';
import propulsion_logo from "../../assets/Propulsion_LogoText_horizontalSwiss_Logo Kopie.png";

const Wrapper = styled.div`
	width: 100%;
	min-width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: row;
`;

const ChildrenBox = styled.div`
flex-grow: 1;
height: 100%;
overflow: auto;
width: 100%;
`;

export const Logo = styled.img`
position: absolute;
bottom: 0;
right: 0;
align-self: flex-end;
height: 40px;
`;

export default function (props) {
	return (
		<Wrapper>
			<NavigationBar/>
				<ChildrenBox>
					{props.children}
				</ChildrenBox>
        		<Logo src={propulsion_logo}/>
		</Wrapper>
	);
}