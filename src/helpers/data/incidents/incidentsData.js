import axios from 'axios';

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

const createNewIncident = (newIncidentObj) => axios.post(`${baseUrl}/incident.json`, newIncidentObj);

const createIncidentUser = (newIncidentUserObj) => axios.post(`${baseUrl}/incident_user.json`, newIncidentUserObj);

const createServiceIncident = (newServiceIncidentObj) => axios.post(`${baseUrl}/service_incident.json`, newServiceIncidentObj);

export default {
  createIncidentUser,
  createNewIncident,
  createServiceIncident,
  getAllIncidents,
  getAllPublicIncidents,
  getIncidentByIncidentId,
  getUserIncidentsByUid,
};
