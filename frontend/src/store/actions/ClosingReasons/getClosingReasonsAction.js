import { SET_CLOSING_REASONS } from "../actionTypes";
import Axios from "../../../axios/authenticated";

export const setClosingReasonsAction = stats => {
	return {
		type: SET_CLOSING_REASONS,
		payload: stats,
	};
};

export const getClosingReasons = () => async (dispatch) => {
	try {
		const response = await Axios.get("cases/closingreasons/");
		dispatch(setClosingReasonsAction(response.data));
	} catch (e) {
		return e;
	}
};
