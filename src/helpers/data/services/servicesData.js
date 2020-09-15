import axios from 'axios';

import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPublicServices = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/service.json?orderBy="is_public"&equalTo=true`)
    .then((response) => {
      const allServices = response.data;
      const pubServices = [];

      if (allServices) {
        Object.keys(allServices).forEach((serviceId) => {
          const service = allServices[serviceId];
          service.id = serviceId;
          pubServices.push(service);
        });
      }
      resolve(pubServices);
    })
    .catch((err) => reject(err));
});

export default { getAllPublicServices };
