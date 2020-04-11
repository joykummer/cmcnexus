import { SET_CASES } from "./actionTypes";
import Axios from "../../axios/authenticated";

export const searchCasesAction = cases => {
  return {
    type: SET_CASES,
    payload: cases
  }
};


export const searchCasesFunction = query => async dispatch => {
    const response = await Axios.get(`cases/?search=${query.title}`);
    dispatch(searchCasesAction(response.data));
};
