import Axios from "../../../axios/authenticated";
import {SET_CURRENT_USER} from "../actionTypes";


export const editUserAction = user => {
    return {
      type: SET_CURRENT_USER,
      payload: user
    }
  };

export const editUser = (data) => async (dispatch) => {
const response = await Axios.patch(`users/me/`, data)
dispatch(editUserAction(response.data))
}