import { SET_ORGANISATIONS } from "../actionTypes";
import Axios from "../../../axios/authenticated";
import { editOrganisations } from "./editOrganisationAction";

export const organisationsAction = (organisations) => {
  return {
    type: SET_ORGANISATIONS,
    payload: organisations,
  };
};

export const organisationsFunction = () => async (dispatch) => {
  const response = await Axios.get("organisations/");
  dispatch(organisationsAction(response.data));
};

export const getOrganisation = organisationId => async (dispatch) => {
  const response = await Axios.get(`organisations/${organisationId}/`);
  dispatch(editOrganisations(response.data));
};
