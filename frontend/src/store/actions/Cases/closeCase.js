import {UPDATE_CASE} from "../actionTypes";
import Axios from "../../../axios/authenticated";

const updateCaseAction = (file) => {
  return {
    type: UPDATE_CASE,
    payload: file,
  };
};

export const closeCaseFunction = (caseId) => async (dispatch) => {
  try {
    const response = await Axios.patch(`cases/${caseId}/close/`);
    dispatch(updateCaseAction(response.data));
  } catch (e) {
    return e;
  }
};