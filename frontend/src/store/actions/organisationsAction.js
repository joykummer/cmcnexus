import { SETORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const organisationsAction = organisations => {
  return {
    type: SETORGANISATIONS,
    payload: organisations
  }
};


export const organisationsFunction = () => async dispatch => {
    const response = await Axios.get('organisations/', );
    dispatch(organisationsAction(response.data));
};
