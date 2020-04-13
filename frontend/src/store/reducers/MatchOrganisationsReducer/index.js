import { MATCH_ORGANISATIONS } from "../../actions/actionTypes";

export default function matchOrganisations(state = [], action) {
  switch (action.type) {
    case MATCH_ORGANISATIONS: {
      return action.payload;
    }
    default:
      return state;
  }
}