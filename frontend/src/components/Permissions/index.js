import React from 'react';
import {useSelector} from 'react-redux';

const useGetRules = async (action, data) => {
	const user_permissions = useSelector(state => state.auth.user ? state.auth.user.permissions : null)
	const permissions = user_permissions ? user_permissions : [];
	if (!permissions) {
		// role is not present in the rules
		return false;
	}

	const staticPermissions = permissions;

	if (staticPermissions && staticPermissions.includes(action)) {
		// static rule not provided for action
		return true;
	}

	const dynamicPermissions = permissions.dynamic;

	if (dynamicPermissions) {
		const permissionCondition = dynamicPermissions[action];
		if (!permissionCondition) {
			// dynamic rule not provided for action
			return false;
		}

		return permissionCondition(data);
	}
	return false;
};

const CanI = props =>
	useGetRules(props.perform, props.data)
		? props.children
		: props.no();

CanI.defaultProps = {
	yes: () => null,
	no: () => null
};

export default CanI;