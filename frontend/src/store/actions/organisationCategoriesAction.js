import { SET_ORGANISATION_CATEGORIES } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const organisationCategoriesAction = organisationCategories => {
  return {
    type: SET_ORGANISATION_CATEGORIES,
    payload: organisationCategories
  }
};


export const organisationCategoriesFunction = () => async dispatch => {
    const response = await Axios.get('organisations/categories/', );
    dispatch(organisationCategoriesAction(response.data));
};
