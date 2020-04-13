// import Axios from "../../axios/authenticated";
// import {CASE_DETAILS} from "./actionTypes";
//
//
// export const caseDetailsAction = cases => {
//   return {
//     type: CASE_DETAILS,
//     payload: cases
//   }
// };
//
// export const caseDetailsFunction = id => async dispatch => {
//     try {
//         const response = await Axios.post('cases/<int:id>/');
//         dispatch(caseDetailsAction(response.data));
//     } catch (e) {
//         console.log('e', e)
//     }
// };