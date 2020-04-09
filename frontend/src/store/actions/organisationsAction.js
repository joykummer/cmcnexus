import { SET_ORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const organisationsAction = organisations => {
  return {
    type: SET_ORGANISATIONS,
    payload: organisations
  }
};


export const organisationsFunction = () => async dispatch => {
    const response = await Axios.get('organisations/', );
    dispatch(organisationsAction(response.data));
};
