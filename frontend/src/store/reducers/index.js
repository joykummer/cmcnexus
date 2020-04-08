import {combineReducers} from 'redux';
import login from './LoginReducer';
import cases from './CasesReducer';

const rootReducer = combineReducers({
	login,
	cases,
})

export default rootReducer