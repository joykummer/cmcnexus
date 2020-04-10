import React from 'react';
import NavigationBar from '../NavigationBar';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: row;
`;

export default function (props) {
	return (
		<Wrapper>
			<NavigationBar/>
			{props.children}
		</Wrapper>
	);
}