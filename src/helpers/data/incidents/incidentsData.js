import axios from 'axios';

import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPublicIncidents = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/incident.json?orderBy="is_public"&equalTo=true`)
    .then((response) => {
      const allIncidents = response.data;
      const pubIncidents = [];

      if (allIncidents) {
        Object.keys(allIncidents).forEach((serviceId) => {
          const service = allIncidents[serviceId];
          service.id = serviceId;
          pubIncidents.push(service);
        });
      }
      resolve(pubIncidents);
    })
    .catch((err) => reject(err));
});

export default { getAllPublicIncidents };
