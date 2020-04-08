import { SETCASES } from "./actionTypes";

export const casesAction = cases => {
  return {
    type: SETCASES,
    payload: cases
  }
};


const casesExamples = [
  { id: 1, first_name: "greta", nationality: 'polish' },
  { id: 2, first_name: "jannic", nationality: 'german' },
];

// const URL = `${BACKEND_URL}restaurants/`;

// const casesExamples = [
//   { id: 1, first_name: "greta" },
//   { id: 2, first_name: "jannic" },
//   { id: 3, first_name: "joy" },
// ];

export const casesFunction = () => async dispatch => {
    // const headers = new Headers({
    //     "Content-Type": "application/json",
    //     //Authorization: "Bearer " + localStorage.getItem('token')
    // });

    // const config = {
    //     method: "GET",
    //     headers
    // };

    // const response = await fetch(config);
    // const cases = await response.json();
    dispatch(casesAction(casesExamples));
};
