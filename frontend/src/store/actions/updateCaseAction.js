import Axios from "../../axios/authenticated";
import {UPDATE_CASE} from "./actionTypes";


export const validateCaseAction = cases => {
    return {
      type: UPDATE_CASE,
      payload: cases
    }
  };

export const validateCaseFunction = (case_id) => async (dispatch) => {
    const response = await Axios.patch(`cases/${case_id}/validate/`);
    dispatch(validateCaseAction(response.data))
}