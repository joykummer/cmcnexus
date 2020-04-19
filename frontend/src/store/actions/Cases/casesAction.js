import { SET_CASES } from "../actionTypes";
import Axios from "../../../axios/authenticated";
import {statsAction} from '../Statistics/getStatisticsAction';

export const casesAction = (organisations) => {
  return {
    type: SET_CASES,
    payload: organisations,
  };
};

export const casesFunction = () => async (dispatch) => {
  try {
    const response = await Axios.get("cases/");
    dispatch(casesAction(response.data));
  } catch (e) {
    return e;
  }
};
