import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const loggedIn = useSelector(state => state.auth.is_authenticated)

	return (
		<Route {...rest} render={(props) => (
			loggedIn === true
				? <Component {...props} />
				: <Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
		)} />
	)
}