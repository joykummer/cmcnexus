import { SET_ORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/authenticated";

export const searchOrganisationsAction = organisations => {
  return {
    type: SET_ORGANISATIONS,
    payload: organisations
  }
};


export const searchOrganisationsFunction = query => async dispatch => {
    const response = await Axios.get(`organisations/?search=${query.name}`);
    dispatch(searchOrganisationsAction(response.data));
};
