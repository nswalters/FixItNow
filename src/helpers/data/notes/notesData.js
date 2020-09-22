import axios from 'axios';

import apiKeys from '../../apiKeys.json';
import utils from '../../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const createNote = (newNoteObj) => axios.post(`${baseUrl}/note.json`, newNoteObj);

const getNote = (noteId) => axios.get(`${baseUrl}/note/${noteId}.json`);

const getNotesByIncidentId = (incidentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/note.json?orderBy="incident_id"&equalTo="${incidentId}"`)
    .then((response) => {
      const collection = utils.collectionMaker(response.data);
      resolve(collection);
    })
    .catch((err) => reject(err));
});

const deleteNote = (noteId) => axios.delete(`${baseUrl}/note/${noteId}.json`);

export default {
  createNote,
  deleteNote,
  getNote,
  getNotesByIncidentId,
};
