import {combineReducers} from 'redux';
import auth from './LoginReducer';
import organisations from './OrganisationsReducer';
import categories from './CategoriesReducer';

const rootReducer = combineReducers({
	auth,
	organisations,
	categories,
});

export default rootReducer