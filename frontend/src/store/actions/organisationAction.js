import { SETCASES } from "./actionTypes";

export const organisationAction = organisation => {
  return {
    type: SETCASES,
    payload: organisation
  }
};


const URL = `${BACKEND_URL}organisations/?search=${data.name}`;

export const organisationFunction = () => async dispatch => {
    const headers = new Headers({
        "Content-Type": "application/json",
        //Authorization: "Bearer " + localStorage.getItem('token')
    });

    const config = {
        method: "GET",
        headers
    };

    const response = await fetch(config);
    const cases = await response.json();
    dispatch(organisationAction(organisationExamples));
};
