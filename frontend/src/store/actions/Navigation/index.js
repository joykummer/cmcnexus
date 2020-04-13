import {SET_NAVIGATION} from '../actionTypes';


export const setNavigationAction = navigationState => {
	return {
		type: SET_NAVIGATION,
		payload: navigationState
	}
};
