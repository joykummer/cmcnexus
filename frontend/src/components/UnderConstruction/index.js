import React from 'react'

import styled from 'styled-components'
import PacmanLoader from "react-spinners/PacmanLoader";
import Axios from '../../axios/not_authenticated';

const Center = styled.div`
display: flex;
justify-content: center;
align-content: center;
`;


export default function UnderConstruction() {
return (
	<Center>
		<PacmanLoader
			size={150}
			color={"#4A90E2"}
			loading={true}
		/>
	</Center>
)
}