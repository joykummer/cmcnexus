import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import CanI from '../Permissions';

export const PrivateRoute = ({component: Component, permission, ...rest}) => {
	const loggedIn = useSelector(state => state.auth.is_authenticated);

	return (
		<Route {...rest} render={(props) => (
			loggedIn === true
				? <Component {...props} />
				: <Redirect to={{
					pathname: '/login',
					state: {from: props.location}
				}}/>
		)}/>
	);
};


export const PrivateRoutePerm = ({permission, ...rest}) => {
	return (
		<CanI perform={permission}>
			<PrivateRoute {...rest}/>
		</CanI>
	);
};
