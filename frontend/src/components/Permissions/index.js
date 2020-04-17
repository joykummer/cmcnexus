import {useSelector} from 'react-redux';


const CanI = props => {
	const permissions = useSelector(state => state.auth.user ? state.auth.user.permissions : null);
	if (!permissions) {
		return null;
	}
	if (permissions && permissions.includes(props.perform)) {
		return props.children;
	}
	console.log("CANNOR", props, permissions)
	return props.no();
}

CanI.defaultProps = {
	yes: () => null,
	no: () => null
};

export default CanI;
