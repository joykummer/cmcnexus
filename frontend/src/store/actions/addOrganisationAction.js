import Axios from "../../axios/not_authenticated";

export const addOrganisationFunction = () => async dispatch => {
    const response = await Axios.get('organisations/', );
};