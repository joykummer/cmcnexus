import { SET_STATS } from "../actionTypes";
import Axios from "../../../axios/authenticated";

export const statsAction = stats => {
	return {
		type: SET_STATS,
		payload: stats,
	};
};

export const getStats = () => async (dispatch) => {
	try {
		const response = await Axios.get("dashboard/");
		dispatch(statsAction(response.data));
	} catch (e) {
		return e;
	}
};
