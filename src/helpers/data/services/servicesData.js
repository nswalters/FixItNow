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

const getAllServices = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/service.json`)
    .then((response) => {
      const serviceObjects = response.data;
      const services = [];

      if (serviceObjects) {
        Object.keys(serviceObjects).forEach((serviceId) => {
          serviceObjects[serviceId].id = serviceId;
          services.push(serviceObjects[serviceId]);
        });
      }
      resolve(services);
    })
    .catch((err) => reject(err));
});

const getUserServicesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/service_user.json?orderBy="user_id"&equalTo="${uid}"`)
    .then((response) => {
      const serviceUserObjects = response.data;
      const userServices = [];

      getAllServices().then((allServices) => {
        Object.keys(serviceUserObjects).forEach((serviceUser) => {
          const userSvc = allServices.find((i) => i.id === serviceUserObjects[serviceUser].service_id);
          userServices.push(userSvc);
        });

        resolve(userServices);
      });
    })
    .catch((err) => reject(err));
});

export default { getAllServices, getAllPublicServices, getUserServicesByUid };
