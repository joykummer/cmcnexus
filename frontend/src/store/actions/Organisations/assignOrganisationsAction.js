import {UPDATE_CASE} from "../actionTypes";
import Axios from "../../../axios/authenticated";
import {getOrganisation} from "./organisationsAction";

const updateCaseAction = (file) => {
  return {
    type: UPDATE_CASE,
    payload: file,
  };
};

export const assignOrganisationsFunction = (caseId, orgId) => async (dispatch) => {
  const response = await Axios.post(`cases/${caseId}/assign/`, {partner_ids: [orgId]});
  dispatch(getOrganisation(orgId));
  dispatch(updateCaseAction(response.data));
};

export const unassignOrganisationsFunction = (caseId, orgId) => async (dispatch) => {
  const response = await Axios.delete(`cases/${caseId}/assign/`, {data: {partner_ids: [orgId]}});
  dispatch(getOrganisation(orgId));
  dispatch(updateCaseAction(response.data));
};