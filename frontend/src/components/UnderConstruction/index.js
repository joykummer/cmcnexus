import React from 'react'

import styled from 'styled-components'
import PacmanLoader from "react-spinners/PacmanLoader";
import Axios from '../../axios/not_authenticated';

const Center = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Offset = styled.div`
padding: 40px 180px 40px 0;
`;

const Bold = styled.div`
font-weight: 600;
`;

export default function UnderConstruction() {
return (
	<Center>
		<Bold>Under construction.</Bold>
		<Offset>
			<PacmanLoader
				size={80}
				color={"#CD0000"}
				loading={true}
			/>
		</Offset>
	</Center>
)
}