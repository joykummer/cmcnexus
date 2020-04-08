import { SETCASES } from "../../actions/actionTypes";

export default function cases(state = { organisations: [] }, action) {
  switch (action.type) {
    case SETCASES: {
      return {
        organisations: action.payload,
      };
    }
    default:
      return state;
  }
}
