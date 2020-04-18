import { SET_CASES } from "./actionTypes";
import Axios from "../../axios/authenticated";

export const searchCasesAction = (cases) => {
  return {
    type: SET_CASES,
    payload: cases,
  };
};

export const searchTitleFunction = (query) => async (dispatch) => {
  const response = await Axios.get(`cases/?search=${query.title}`);
  dispatch(searchCasesAction(response.data));
};

export const searchStatusFunction = (query) => async (dispatch) => {
  const response = await Axios.get(`cases/?search=${query.status}`);
  dispatch(searchCasesAction(response.data));
};
