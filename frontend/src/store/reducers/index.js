import {combineReducers} from 'redux';
import auth from './LoginReducer';
import cases from './CasesReducer';
import organisations from './OrganisationsReducer';
import categories from './CategoriesReducer';
import navigation from './NavigationReducer';
import matchOrganisations from "./MatchOrganisationsReducer";

const rootReducer = combineReducers({
	auth,
	cases,
	organisations,
	matchOrganisations,
	categories,
	navigation,
});

export default rootReducer