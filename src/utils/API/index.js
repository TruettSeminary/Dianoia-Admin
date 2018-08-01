import { Dianoia } from 'dianoia-js'; 

const baseURL = process.env.REACT_APP_BASEURL;

const jwt = ''; 
const api = new Dianoia({baseURL, jwt}); 
export default api;