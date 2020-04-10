import {combineReducers} from 'redux';
import login from './LoginReducer';
import organisations from './OrganisationsReducer';
import organisationCategories from './OrganisationCategoriesReducer';

const rootReducer = combineReducers({
	login,
	organisations,
	organisationCategories,
});

export default rootReducer