import Axios from "../../../axios/authenticated";
import {DELETE_CASE} from "../actionTypes";

const deleteCaseAction = (caseId) => {
  return {
    type: DELETE_CASE,
    payload: caseId,
  };
};

export const deleteCaseFunction = (caseId) => async (dispatch) => {
  try {
    await Axios.delete(`cases/${caseId}/`);
    dispatch(deleteCaseAction(caseId));
  } catch (e) {
    return e;
  }
};