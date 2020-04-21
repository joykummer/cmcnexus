import Axios from "../../../axios/authenticated";
import { ADD_ORGANISATION } from "../actionTypes";
import {organisationsFunction} from "./organisationsAction";

export const addOrganisationAction = (organisations) => {
  return {
    type: ADD_ORGANISATION,
    payload: organisations,
  };
};

export const addOrganisationFunction = (data) => async (dispatch) => {
  try {
    const response = await Axios.post("organisations/add/", data);
    dispatch(organisationsFunction());
    dispatch(addOrganisationAction(response.data));
  } catch (e) {
    return e;
  }
};
