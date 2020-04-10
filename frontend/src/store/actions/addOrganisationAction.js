import Axios from "../../axios/not_authenticated";

export const addOrganisationFunction = data => async dispatch => {
    console.log('in the add function', data);
    const response = await Axios.post('organisations/');
};