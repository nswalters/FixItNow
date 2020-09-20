import axios from 'axios';

import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllUsers = () => axios.get(`${baseUrl}/user.json`);

export default { getAllUsers };
