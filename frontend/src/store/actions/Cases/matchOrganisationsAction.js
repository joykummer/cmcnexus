import {UPDATE_CASE} from "../actionTypes";
import Axios from "../../../axios/authenticated";
import { getOrganisation } from "../Organisations/organisationsAction";

const updateCaseAction = (file) => {
  return {
    type: UPDATE_CASE,
    payload: file,
  };
};

export const matchOrganisationsFunction = (caseId, orgId) => async (dispatch) => {
  const response = await Axios.post(`cases/${caseId}/match/`, {partner_ids: [orgId]});
  dispatch(getOrganisation(orgId));
  dispatch(updateCaseAction(response.data));
};

export const unmatchOrganisationsFunction = (caseId, orgId) => async (dispatch) => {
  const response = await Axios.delete(`cases/${caseId}/match/`, {data: {partner_ids: [orgId]}});
  dispatch(getOrganisation(orgId));
  dispatch(updateCaseAction(response.data));
};