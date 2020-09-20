import axios from 'axios';

import apiKeys from '../../apiKeys.json';
import utils from '../../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getServiceByServiceId = (serviceId) => axios.get(`${baseUrl}/service/${serviceId}.json`);

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

const getServiceUserByServiceId = (serviceId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/service_user.json?orderBy="service_id"&equalTo="${serviceId}"`)
    .then((response) => {
      const collection = utils.collectionMaker(response.data);
      resolve(collection);
    })
    .catch((err) => reject(err));
});

const createNewService = (newServiceObj) => axios.post(`${baseUrl}/service.json`, newServiceObj);

const createServiceUser = (newServiceUserObj) => axios.post(`${baseUrl}/service_user.json`, newServiceUserObj);

const deleteService = (serviceId) => axios.delete(`${baseUrl}/service/${serviceId}.json`);

const deleteServiceUserByServiceUserId = (serviceUserId) => axios.delete(`${baseUrl}/service_user/${serviceUserId}.json`);

const deleteServiceUserByServiceId = (serviceId) => new Promise((resolve, reject) => {
  getServiceUserByServiceId(serviceId).then((serviceUserRecords) => {
    serviceUserRecords.forEach((serviceUser) => {
      deleteServiceUserByServiceUserId(serviceUser.id);
    });
    resolve();
  })
    .catch((err) => reject(err));
});

const destroyService = (serviceId) => new Promise((resolve, reject) => {
  deleteService(serviceId)
    .then(() => {
      deleteServiceUserByServiceId(serviceId)
        .then(() => resolve());
    })
    .catch((err) => reject(err));
});

export default {
  createNewService,
  createServiceUser,
  deleteService,
  deleteServiceUserByServiceId,
  destroyService,
  getAllServices,
  getAllPublicServices,
  getServiceByServiceId,
  getServiceUserByServiceId,
  getUserServicesByUid,
};
