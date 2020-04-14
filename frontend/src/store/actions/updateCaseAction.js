import Axios from "../../axios/authenticated";
import {UPDATE_CASE} from "./actionTypes";


export const updateCaseAction = cases => {
    return {
      type: UPDATE_CASE,
      payload: cases
    }
  };

export const updateCaseFunction = () => async (dispatch) => {
const response = await Axios.patch("cases/2/validate/")
console.log("from the updateCaseFunction", response)
dispatch(updateCaseAction(response.data))
}