import Axios from "../../axios/authenticated";
import { ADD_CASE } from "./actionTypes";

export const addCaseAction = (cases) => {
  return {
    type: ADD_CASE,
    payload: cases,
  };
};

export const addCaseFunction = (data) => async (dispatch) => {
  try {
    const response = await Axios.post("cases/", data);
    dispatch(addCaseAction(response.data));
  } catch (e) {
    console.log('hi', e.response);
    return (e)
  }
};
