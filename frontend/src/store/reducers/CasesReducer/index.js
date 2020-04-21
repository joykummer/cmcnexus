import { SET_CASES, ADD_CASE, UPDATE_CASE, DELETE_CASE} from "../../actions/actionTypes";

export default function cases(state = [], action) {
  switch (action.type) {
    case SET_CASES: {
      return action.payload;
    }
    case ADD_CASE: {
      return [...state, action.payload];
    }
    case UPDATE_CASE: {
      return state.map((c) => c.id === action.payload.id ? action.payload : c)
    }
    case DELETE_CASE: {
      return state.filter(c => c.id !== action.payload)
    }
    default:
      return state;
  }
}
