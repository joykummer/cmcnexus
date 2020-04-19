import React from 'react'

import styled from 'styled-components'

const Center = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
`;

const Bold = styled.div`
font-weight: 600;
`;

export default function PermissionDenied() {
return (
	<Center>
		<Bold>
			403 Forbidden
		</Bold> <br/>
		You tried to access something you have no permission to access. <br/><br/>
		If you think you should have permission, please contact an admin.
	</Center>
)
}