import Axios from "../../axios/authenticated";
import { EDIT_ORGANISATION } from "./actionTypes";


export const editOrganisations = organisations => {
    return {
      type: EDIT_ORGANISATION,
      payload: organisations, 
    }
  };

export const editOrganisationFunction = (data, organisation_id) => async (dispatch) => {
console.log("in the editFunction", data)
const response = await Axios.patch(`organisations/${organisation_id}/`, data)
console.log("this is the response", response)
dispatch(editOrganisations(response.data))
}