import { GETCASES, SEARCH } from "../../actions/actionTypes";


export default function cases(state = { cases: [] }, action) {
  switch (action.type) {
    case GETCASES: {
      console.log('in the getcases', action.payload)
      return {
        cases: action.payload,
      };
    }
    case SEARCH: {
      return {
        cases: action.payload,
      };
    }
    default:
      return state;
  }
}
