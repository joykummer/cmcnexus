import {GETCASES, SEARCH} from '../../actions/actionTypes';

const init = {
    cases: []
}

export default function login(state = init, action) {
	switch(action.type) {
		case GETCASES: {
			return {
				cases: action.payload
			}
        }
        case SEARCH: {
            return {
                cases: action.payload
            }
        }
		default:
			return state
	}
}