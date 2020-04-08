import { SETCASES } from "./actionTypes";

export const searchCasesAction = (query) => ({
  type: SETCASES,
  payload: query,
});

export const searchCasesFunction = (query) => async (dispatch) => {
  console.log('in the search cases', query);
//   try {
    // const response = await Axios.post('URL GOES HERE', { query });
    dispatch(searchCasesAction(query));
//   } catch (e) {
//     dispatch(loginErrorAction("The credentials are not valid"));
//     return e;
//   }
};
