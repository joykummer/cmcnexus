import Axios from "../../../axios/authenticated";
import { ADD_CASE } from "../actionTypes";
import {categoriesAction} from "../Categories/categoriesAction";

export const addCaseAction = (cases) => {
  return {
    type: ADD_CASE,
    payload: cases,
  };
};

export const addCaseFunction = (data) => async (dispatch) => {
  try {
    const response = await Axios.post("cases/add/", data);
    dispatch(addCaseAction(response.data));
  } catch (e) {
    return (e)
  }
};
