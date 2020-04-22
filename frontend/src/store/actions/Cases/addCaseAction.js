import Axios from "../../../axios/authenticated";
import { ADD_CASE } from "../actionTypes";
import {casesFunction} from "./casesAction";

export const addCaseAction = (cases) => {
  return {
    type: ADD_CASE,
    payload: cases,
  };
};

export const addCaseFunction = (data, history) => async (dispatch) => {
  try {
    const response = await Axios.post("cases/add/", data);
    dispatch(casesFunction())
    dispatch(addCaseAction(response.data));
    const caseId = response.data.id
    history.push(`/cases/details/${caseId}/`);
  } catch (e) {
    return (e)
  }
};
