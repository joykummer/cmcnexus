import {SET_CURRENT_USER} from '../actionTypes';
import Axios from '../../../axios/authenticated';

export const currentUserAction = ({user}) => {
	return ({
		type: SET_CURRENT_USER,
		payload: user
	})
}

export const getCurrentUser = () => async (dispatch) => {
	try {
		const response = await Axios.get('users/me/');

		const user = response.data;
		if (user) {
			dispatch(currentUserAction({user}));
		}
		return response
	} catch (e) {
		return e
	}
};
