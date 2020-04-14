import { SET_CASES, ADD_CASE } from "../../actions/actionTypes";

export default function cases(state = [], action) {
  switch (action.type) {
    case SET_CASES: {
      return action.payload;
    }
    case ADD_CASE: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
