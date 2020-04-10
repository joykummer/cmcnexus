import {combineReducers} from 'redux';
import auth from './LoginReducer';
import organisations from './OrganisationsReducer';

const rootReducer = combineReducers({
	auth,
	organisations,
});

export default rootReducer