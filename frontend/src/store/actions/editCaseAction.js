import Axios from "../../axios/authenticated";
import { EDIT_CASE } from "./actionTypes";


export const editCase = cases => {
    return {
      type: EDIT_CASE,
      payload: cases, 
    }
  };

export const editCaseFunction = (data, case_id) => async (dispatch) => {
console.log("in the editFunction", data)
const response = await Axios.patch(`cases/${case_id}/`, data)
console.log("this is the response", response)
dispatch(editCase(response.data))
}