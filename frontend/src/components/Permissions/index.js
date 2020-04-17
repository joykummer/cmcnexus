import React from 'react';
import {useSelector} from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";


const Center = styled.div`
width:100%;
display: flex;
justify-content: center;
align-items: center;
`;

const CanI = props => {
	const permissions = useSelector(state => state.auth.user ? state.auth.user.permissions : null);
	if (!permissions) {
		return (
			<Center>
				<ClipLoader
					size={35}
					color={"#ff0000"}
					loading={true}
				/>
			</Center>
		);
	}
	if (permissions && permissions.includes(props.perform)) {
		return props.children;
	}
	return props.no();
}

CanI.defaultProps = {
	yes: () => null,
	no: () => null
};

export default CanI;
