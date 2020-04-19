import Axios from "../../axios/authenticated";
import { EDIT_ORGANISATION } from "./actionTypes";


export const editOrganisations = organisations => {
    return {
      type: EDIT_ORGANISATION,
      payload: organisations, 
    }
  };

export const editOrganisationFunction = (data, organisation_id) => async (dispatch) => {
  try {
    const response = await Axios.patch(`organisations/${organisation_id}/`, data);
    dispatch(editOrganisations(response.data));
  } catch (e) {
    return e;
  }
}