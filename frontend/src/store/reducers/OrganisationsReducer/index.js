import { SET_ORGANISATIONS } from "../../actions/actionTypes";

export default function organisations(state = [], action) {
  switch (action.type) {
    case SET_ORGANISATIONS: {
      return action.payload;
    }
    default:
      return state;
  }
}
