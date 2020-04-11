import { SET_CASES } from "./actionTypes";
import Axios from "../../axios/authenticated";

export const casesAction = organisations => {
  return {
    type: SET_CASES,
    payload: organisations
  }
};


export const casesFunction = () => async dispatch => {
    const response = await Axios.get('cases/', );
    dispatch(casesAction(response.data));
};
