import {MATCH_ORGANISATIONS} from "./actionTypes";
import Axios from "../../axios/authenticated";

export const matchOrganisationsAction = (organisations) => {
  return {
    type: MATCH_ORGANISATIONS,
    payload: organisations,
  };
};

export const matchOrganisationsFunction = () => async (dispatch) => {
  const response = await Axios.get("organisations/category/1/");
  console.log('THIS IS THE RESPONSE DATA', response.data)
  dispatch(matchOrganisationsAction(response.data));
};
