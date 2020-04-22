import { SET_CLOSING_REASONS } from "../../actions/actionTypes";

export default function closingReasons(state = [], action) {
  switch (action.type) {
    case SET_CLOSING_REASONS: {
      return action.payload;
    }
    default:
      return state;
  }
}
