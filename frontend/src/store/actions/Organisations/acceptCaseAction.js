import {UPDATE_CASE} from "../actionTypes";
import Axios from "../../../axios/authenticated";
import {getCurrentUser} from "../Authentication/userActions";

const updateCaseAction = (file) => {
  return {
    type: UPDATE_CASE,
    payload: file,
  };
};

export const acceptCaseByOrgFunction = (caseId, orgId) => async (dispatch) => {
  try {
    const response = await Axios.post(`cases/${caseId}/accept/`, {partner_ids: orgId});
    dispatch(updateCaseAction(response.data));
    dispatch(getCurrentUser());
  } catch (e) {
    return e;
  }
};

export const unacceptCaseByOrgFunction = (caseId, orgId) => async (dispatch) => {
  try {
    const response = await Axios.delete(`cases/${caseId}/accept/`, {data: {partner_ids: orgId}});
    dispatch(updateCaseAction(response.data));
    dispatch(getCurrentUser());
  } catch (e) {
    return e;
  }
};