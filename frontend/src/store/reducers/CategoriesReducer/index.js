import { SET_CATEGORIES } from "../../actions/actionTypes";

export default function categories(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      return action.payload;
    }
    default:
      return state;
  }
}
