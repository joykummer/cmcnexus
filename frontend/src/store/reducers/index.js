import {combineReducers} from 'redux';
import login from './LoginReducer';
import organisations from './OrganisationsReducer';

const rootReducer = combineReducers({
	login,
	organisations,
});

export default rootReducer