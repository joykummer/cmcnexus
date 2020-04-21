import Axios from "../../../axios/authenticated";
import {DELETE_CASE} from "../actionTypes";
import {casesFunction} from "./casesAction";

const deleteCaseAction = (file) => {
  return {
    type: DELETE_CASE,
    payload: file,
  };
};

export const deleteCaseFunction = (caseId, history) => async (dispatch) => {
  try {
    const response = await Axios.delete(`cases/${caseId}/`);
    dispatch(deleteCaseAction(response.data));
    dispatch(casesFunction());
  } catch (e) {
    return e;
  }
};