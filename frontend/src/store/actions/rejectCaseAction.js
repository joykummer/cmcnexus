import Axios from "../../axios/authenticated";
import {UPDATE_CASE} from "./actionTypes";


export const rejectCaseAction = cases => {
    return {
      type: UPDATE_CASE,
      payload: cases
    }
  };

export const rejectCaseFunction = (case_id) => async (dispatch) => {
const response = await Axios.patch(`cases/${case_id}/reject/`)
dispatch(rejectCaseAction(response.data))
}

