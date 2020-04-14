import Axios from "../../axios/authenticated";
import {ACCEPT_CASE} from "./actionTypes";


export const updateCaseAction = cases => {
    return {
      type: ACCEPT_CASE,
      payload: cases
    }
  };

export const updateCaseFunction = (case_id) => async (dispatch) => {
const response = await Axios.patch(`cases/${case_id}/validate/`)
dispatch(updateCaseAction(response.data))
}