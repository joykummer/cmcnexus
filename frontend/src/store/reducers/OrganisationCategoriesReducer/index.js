import { SET_ORGANISATION_CATEGORIES } from "../../actions/actionTypes";

export default function organisationCategories(state = [], action) {
  switch (action.type) {
    case SET_ORGANISATION_CATEGORIES: {
      return action.payload
    }
    default:
      return state;
  }
}
