import axios from 'axios';
import baseUrl from "../constants";
import { store } from '../store';


// creating a custom instance of axios make fetches more convenient by giving custom defaults
const Axios = axios.create({
	baseUrl: baseUrl
});

Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// Use the axios instance exported from here instead of importing the default one when fetching data
export default Axios;
