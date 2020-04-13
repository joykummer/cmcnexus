import {MATCH_ORGANISATIONS} from "./actionTypes";
import Axios from "../../axios/authenticated";

export const matchListOrganisationsAction = (organisations) => {
  return {
    type: MATCH_ORGANISATIONS,
    payload: organisations,
  };
};

export const matchListOrganisationsFunction = () => async (dispatch) => {
  const response = await Axios.get("organisations/category/1/");
  console.log('THIS IS THE RESPONSE DATA', response.data)
  dispatch(matchListOrganisationsAction(response.data));
};
