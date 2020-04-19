import { SET_STATS } from "../../actions/actionTypes";

export default function stats(state = [], action) {
  switch (action.type) {
    case SET_STATS: {
      return action.payload;
    }
    default:
      return state;
  }
}
