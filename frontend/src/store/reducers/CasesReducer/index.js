import { SET_CASES } from "../../actions/actionTypes";

export default function cases(state = [], action) {
  switch (action.type) {
    case SET_CASES: {
      return action.payload
    }
    default:
      return state;
  }
}