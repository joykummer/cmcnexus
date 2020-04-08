import { SEARCH } from "./actionTypes";

export const searchAction = (query) => ({
  type: SEARCH,
  payload: query,
});

export const searchCases = ({ query }) => async (dispatch) => {
//   try {
    // const response = await Axios.post('URL GOES HERE', { query });
    dispatch(searchAction(query));
//   } catch (e) {
//     dispatch(loginErrorAction("The credentials are not valid"));
//     return e;
//   }
};
