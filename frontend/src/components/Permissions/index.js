import React from 'react';
import {useSelector} from 'react-redux';

const rules = [
		"posts:list",
		"posts:create",
		"posts:edit",
		"posts:delete",
		"users:get",
		"users:getSelf",
		"home-page:visit",
		"dashboard-page:visit"
];


const useGetRules = (action, data) => {
	const user_permissions = useSelector(state => state.login.user ? state.login.user.permissions : null)
	const permissions = user_permissions ? user_permissions : rules;
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