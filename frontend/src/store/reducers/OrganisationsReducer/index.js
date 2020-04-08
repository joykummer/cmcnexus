import { SETORGANISATIONS, SEARCH } from "../../actions/actionTypes";

export default function organisations(state = [], action) {
  switch (action.type) {
    case SETORGANISATIONS: {
      return action.payload
    }
    default:
      return state;
  }
}
