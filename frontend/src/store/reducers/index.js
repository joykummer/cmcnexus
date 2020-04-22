import {combineReducers} from 'redux';
import auth from './LoginReducer';
import cases from './CasesReducer';
import organisations from './OrganisationsReducer';
import categories from './CategoriesReducer';
import navigation from './NavigationReducer';
import stats from './StatisticsReducer';
import closingReasons from "./ClosingReasons";

const rootReducer = combineReducers({
	auth,
	cases,
	organisations,
	categories,
	navigation,
	stats,
	closingReasons,
});

export default rootReducer