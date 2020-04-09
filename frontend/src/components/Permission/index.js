import rules from "./rules";

const check = (action, data) => {
	const permissions = rules;
	if (!permissions) {
		// role is not present in the rules
		return false;
	}

	const staticPermissions = permissions.static;

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
	check(props.perform, props.data)
		? (props.yes() ? props.yes() : props.children)
		: props.no();

CanI.defaultProps = {
	yes: () => null,
	no: () => null
};

export default CanI;