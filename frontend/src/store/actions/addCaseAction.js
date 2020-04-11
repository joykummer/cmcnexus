import Axios from "../../axios/authenticated";

export const addCaseFunction = data => async dispatch => {
    try {
        const response = await Axios.post('cases/add/', data)
    } catch (e) {
        console.log('e', e)
    }
};