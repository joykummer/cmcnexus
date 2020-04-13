import React, {useState} from 'react';
import {useSelector} from 'react-redux';


const CanI = props => {
	const permissions = useSelector(state => state.auth.user ? state.auth.user.permissions : null)

	if (permissions && permissions.includes(props.perform)) {
		return props.children;
	}
	return () => props.no();
}

CanI.defaultProps = {
	yes: () => null,
	no: () => null
};

export default CanI;
