import Axios from "../../axios/authenticated";
import { ADD_ORGANISATION } from "./actionTypes";

export const addOrganisationAction = (organisations) => {
  return {
    type: ADD_ORGANISATION,
    payload: organisations,
  };
};

export const addOrganisationFunction = (data) => async (dispatch) => {
  try {
    const response = await Axios.post("organisations/add/", data);
    dispatch(addOrganisationAction(response.data));
  } catch (e) {
    console.log("e", e);
  }
};
