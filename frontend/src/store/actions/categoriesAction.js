import { SET_CATEGORIES } from "./actionTypes";
import Axios from "../../axios/authenticated";

export const categoriesAction = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

export const categoriesFunction = () => async (dispatch) => {
  const response = await Axios.get("categories/");
  dispatch(categoriesAction(response.data));
};
