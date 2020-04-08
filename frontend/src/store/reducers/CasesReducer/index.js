import { SETCASES, SEARCH } from "../../actions/actionTypes";


export default function cases(state = [], action) {
  switch (action.type) {
    case SETCASES: {
      return action.payload;
    }
    default:
      return state;
  }
}
