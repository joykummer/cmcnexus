import {LOGOUT, SET_NAVIGATION} from '../../actions/actionTypes';
import {DASHBOARD} from '../../../components/Navigation/states';

const init = DASHBOARD;


export default function navigation(state = init, action) {
	switch(action.type) {
		case SET_NAVIGATION: {
			return action.payload;
		}
		case LOGOUT: return init;
		default:
			return state
	}
}