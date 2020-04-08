import { SETORGANISATIONS } from "./actionTypes";
import Axios from "../../axios/not_authenticated";

export const organisationsAction = organisations => {
  return {
    type: SETORGANISATIONS,
    payload: organisations
  }
};



export const organisationsFunction = () => async dispatch => {
    const response = await Axios.get('organisations/', );
    // console.log('this is the response', response);
    // const URL = `http://localhost:8000/backend/api/organisations/`;
    //
    // const headers = new Headers({
    //     "Content-Type": "application/json",
    //     //Authorization: "Bearer " + localStorage.getItem('token')
    // });
    //
    // const config = {
    //     method: "GET",
    //     headers
    // };
    //
    // const response = await fetch(URL, config);
    // const organisations = await response.json();
    dispatch(organisationsAction(response.data));
};
