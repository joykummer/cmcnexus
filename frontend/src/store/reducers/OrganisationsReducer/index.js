import { SET_ORGANISATIONS, ADD_ORGANISATION } from "../../actions/actionTypes";

export default function organisations(state = [], action) {
  switch (action.type) {
    case SET_ORGANISATIONS: {
      return action.payload;
    }
    case ADD_ORGANISATION: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
