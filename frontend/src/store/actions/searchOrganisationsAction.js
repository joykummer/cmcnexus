import { SETORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const searchOrganisationsAction = organisation => {
  console.log('test', organisation);
  return {
    type: SETORGANISATIONS,
    payload: organisation
  }
};



export const searchOrganisationsFunction = query => async dispatch => {
    // console.log('in the search organisation function', query);
    const URL = `http://localhost:8000/backend/api/organisations/?search=${query.name}`;
    // const response = await Axios.get(`organisations/?search=${query.name}/`, );
    const headers = new Headers({
        "Content-Type": "application/json",
        //Authorization: "Bearer " + localStorage.getItem('token')
    });

    const config = {
        method: "GET",
        headers
    };

    const response = await fetch(URL, config);
    const organisation = await response.json();
    // console.log('RESPONSE', response);
    dispatch(searchOrganisationsAction(organisation));
};
