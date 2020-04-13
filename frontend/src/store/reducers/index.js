import {combineReducers} from 'redux';
import auth from './LoginReducer';
import cases from './CasesReducer';
import organisations from './OrganisationsReducer';
import categories from './CategoriesReducer';
import navigation from './NavigationReducer';

const rootReducer = combineReducers({
	auth,
	cases,
	organisations,
	categories,
	navigation,
});

export default rootReducer