import { SETORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const searchOrganisationsAction = organisation => {
  return {
    type: SETORGANISATIONS,
    payload: organisation
  }
};



export const searchOrganisationsFunction = query => async dispatch => {
    const response = await Axios.get(`organisations/?search=${query.name}`);
    console.log('RESPONSE', response);
    dispatch(searchOrganisationsAction(response.data));
};
