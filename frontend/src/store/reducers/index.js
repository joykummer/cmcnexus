import {combineReducers} from 'redux';
import auth from './LoginReducer';
import organisations from './OrganisationsReducer';
import organisationCategories from './OrganisationCategoriesReducer';

const rootReducer = combineReducers({
	auth,
	organisations,
	organisationCategories,
});

export default rootReducer