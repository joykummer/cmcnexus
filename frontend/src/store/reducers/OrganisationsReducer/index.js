import { SET_ORGANISATIONS, ADD_ORGANISATION, EDIT_ORGANISATION } from "../../actions/actionTypes";

export default function organisations(state = [], action) {
  switch (action.type) {
    case SET_ORGANISATIONS: {
      return action.payload;
    }
    case ADD_ORGANISATION: {
      return [...state, action.payload];
    }
    case EDIT_ORGANISATION:{
      return state.map((org) => org.id === action.payload.id ? action.payload : org)
    }
    default:
      return state;
  }
}
