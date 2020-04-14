import {LOGIN, LOGIN_ERROR, LOGOUT} from './actionTypes';
import Axios from '../../axios/not_authenticated';

export const loginAction = ({token, user}) => {
	return ({
		type: LOGIN,
		payload: {token, user}
	})
}


export const loginErrorAction = error => {
	return {
		type: LOGIN_ERROR,
		payload: error
	}
}


export const logoutAction = () => {
	return {
		type: LOGOUT
	}
}


export const login = ({ email, password, rememberMe }) => async (dispatch) => {
	try {
		const response = await Axios.post('token/', { email, password });

		const token = response.data.access;
		const user = response.data.user
		if (token) {
			dispatch(loginAction({token, user}));
			if (rememberMe) {
				localStorage.setItem('token', token);
				localStorage.setItem('user', user);
			}
		}
		return response
	} catch (e) {
		dispatch(loginErrorAction('The credentials are not valid'));
		return e
	}
};
