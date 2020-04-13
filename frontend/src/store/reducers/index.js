import {combineReducers} from 'redux';
import auth from './LoginReducer';
import cases from './CasesReducer';
import organisations from './OrganisationsReducer';
import categories from './CategoriesReducer';

const rootReducer = combineReducers({
	auth,
	cases,
	organisations,
	categories,
});

export default rootReducer