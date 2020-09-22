import axios from 'axios';

import apiKeys from '../../apiKeys.json';
import utils from '../../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllUsers = () => axios.get(`${baseUrl}/user.json`);

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(utils.collectionMaker(response.data)[0]))
    .catch((err) => reject(err));
});

export default { getAllUsers, getUserByUid };
