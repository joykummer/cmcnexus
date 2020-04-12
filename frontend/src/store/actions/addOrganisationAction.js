import Axios from "../../axios/authenticated";

export const addOrganisationFunction = (data) => async (dispatch) => {
  console.log("in the add function", data);
  try {
    const response = await Axios.post("organisations/add/", data);
  } catch (e) {
    console.log("e", e);
  }
};
