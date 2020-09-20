import axios from 'axios';

import utils from '../../utils';

import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getIncidentByIncidentId = (incidentId) => axios.get(`${baseUrl}/incident/${incidentId}.json`);

const getAllIncidents = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/incident.json`)
    .then((response) => {
      const incidentObjects = response.data;
      const incidents = [];

      if (incidentObjects) {
        Object.keys(incidentObjects).forEach((incidentId) => {
          incidentObjects[incidentId].id = incidentId;
          incidents.push(incidentObjects[incidentId]);
        });
      }
      resolve(incidents);
    })
    .catch((err) => reject(err));
});

const getAllPublicIncidents = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/incident.json?orderBy="is_public"&equalTo=true`)
    .then((response) => {
      const allIncidents = response.data;
      const pubIncidents = [];

      if (allIncidents) {
        Object.keys(allIncidents).forEach((incidentId) => {
          const incident = allIncidents[incidentId];
          incident.id = incidentId;
          pubIncidents.push(incident);
        });
      }
      resolve(pubIncidents);
    })
    .catch((err) => reject(err));
});

const getUserIncidentsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/incident_user.json?orderBy="user_id"&equalTo="${uid}"`)
    .then((response) => {
      const incidentUserObjects = response.data;
      const userIncidents = [];

      getAllIncidents().then((allIncidents) => {
        Object.keys(incidentUserObjects).forEach((incidentUser) => {
          const userInc = allIncidents.find((i) => i.id === incidentUserObjects[incidentUser].incident_id);
          userIncidents.push(userInc);
        });

        resolve(userIncidents);
      });
    })
    .catch((err) => reject(err));
});

const getUserIncidentsByIncidentId = (incidentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/incident_user.json?orderBy="incident_id"&equalTo="${incidentId}"`)
    .then((response) => {
      const collection = utils.collectionMaker(response.data);
      resolve(collection);
    })
    .catch((err) => reject(err));
});

const getServiceIncidentsByIncidentId = (incidentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/service_incident.json?orderBy="incident_id"&equalTo="${incidentId}"`)
    .then((response) => {
      const collection = utils.collectionMaker(response.data);
      resolve(collection);
    })
    .catch((err) => reject(err));
});

const createNewIncident = (newIncidentObj) => axios.post(`${baseUrl}/incident.json`, newIncidentObj);

const createIncidentUser = (newIncidentUserObj) => axios.post(`${baseUrl}/incident_user.json`, newIncidentUserObj);

const createServiceIncident = (newServiceIncidentObj) => axios.post(`${baseUrl}/service_incident.json`, newServiceIncidentObj);

const deleteIncidentUser = (incidentUserId) => axios.delete(`${baseUrl}/incident_user/${incidentUserId}.json`);

const deleteServiceIncident = (serviceIncidentId) => axios.delete(`${baseUrl}/service_incident/${serviceIncidentId}.json`);

const deleteIncident = (incidentId) => axios.delete(`${baseUrl}/incident/${incidentId}.json`);

const destroyIncident = (incidentId) => new Promise((resolve, reject) => {
  deleteIncident(incidentId).then(() => {
    getUserIncidentsByIncidentId(incidentId).then((incidentUserRecords) => {
      console.error('IUR: ', incidentUserRecords);
      incidentUserRecords.forEach((incidentUser) => {
        deleteIncidentUser(incidentUser.id);
      });
      getServiceIncidentsByIncidentId(incidentId).then((incidentServiceRecords) => {
        console.error('ISR: ', incidentServiceRecords);
        incidentServiceRecords.forEach((incidentService) => {
          deleteServiceIncident(incidentService.id);
        });
        resolve();
      });
    });
  })
    .catch((err) => reject(err));
});

export default {
  createIncidentUser,
  createNewIncident,
  createServiceIncident,
  deleteIncident,
  deleteIncidentUser,
  deleteServiceIncident,
  destroyIncident,
  getAllIncidents,
  getAllPublicIncidents,
  getIncidentByIncidentId,
  getServiceIncidentsByIncidentId,
  getUserIncidentsByUid,
};
