import axios from 'axios';

import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

// Impact
const fetchLookupImpact = () => axios.get(`${baseUrl}/lu_impact.json`);

const readLookupImpact = (impactId) => JSON.parse(sessionStorage.getItem('lu_impact'))[impactId];

const readAllLookupImpact = () => JSON.parse(sessionStorage.getItem('lu_impact'));

// Severity
const fetchLookupSeverity = () => axios.get(`${baseUrl}/lu_severity.json`);

const readLookupSeverity = (severityId) => JSON.parse(sessionStorage.getItem('lu_severity'))[severityId];

const readAllLookupSeverity = () => JSON.parse(sessionStorage.getItem('lu_severity'));

// Status Type
const fetchLookupStatusType = () => axios.get(`${baseUrl}/lu_status_type.json`);

const readLookupStatusType = (statusTypeId) => JSON.parse(sessionStorage.getItem('lu_status_type'))[statusTypeId];

const readAllLookupStatusType = () => JSON.parse(sessionStorage.getItem('lu_status_type'));

export default {
  fetchLookupImpact,
  readLookupImpact,
  fetchLookupStatusType,
  readLookupStatusType,
  fetchLookupSeverity,
  readLookupSeverity,
  readAllLookupImpact,
  readAllLookupSeverity,
  readAllLookupStatusType,
};
