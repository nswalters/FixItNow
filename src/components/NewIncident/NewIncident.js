/* eslint-disable max-len */
import React, { Component } from 'react';

import lookupData from '../../helpers/data/lookupData/lookupData';
import servicesData from '../../helpers/data/services/servicesData';
import usersData from '../../helpers/data/users/usersData';
import utils from '../../helpers/utils';

import './NewIncident.scss';
import incidentsData from '../../helpers/data/incidents/incidentsData';

class NewIncident extends Component {
  state = {
    allUsers: [],
    allServices: [],
    title: '',
    description: '',
    owner: '',
    severity: '',
    impact: '',
    status: '',
    affectedServices: '',
    is_public: false,
    uid: this.props.uid,
  }

  submitFormData = () => {
    const incidentObject = {
      created_at: Date.now(),
      created_by: this.state.uid,
      description: this.state.description,
      impact_id: this.state.impact,
      is_public: this.state.is_public,
      severity_id: this.state.severity,
      status_type_id: this.state.status,
      title: this.state.title,
    };

    incidentsData.createNewIncident(incidentObject)
      .then((response) => {
        const createdIncidentId = response.data.name;
        const incidentUserObject = {
          incident_id: createdIncidentId,
          user_id: this.state.uid,
        };
        incidentsData.createIncidentUser(incidentUserObject)
          .then(() => {
            const serviceIncidentObject = {
              incident_id: response.data.name,
              service_id: this.state.affectedServices,
            };
            servicesData.getServiceByServiceId(this.state.affectedServices)
              .then((resp) => {
                const affectedService = resp.data;
                affectedService.impact_id = this.state.impact;
                servicesData.updateService(this.state.affectedServices, affectedService)
                  .then(() => {
                    incidentsData.createServiceIncident(serviceIncidentObject)
                      .then(() => {
                        this.props.history.push(`/incidents/${createdIncidentId}`);
                      });
                  });
              });
          });
      });
  };

  componentDidMount() {
    usersData.getAllUsers()
      .then((response) => {
        this.setState({ allUsers: utils.collectionMaker(response.data) });
      })
      .catch((err) => console.error('Could not get all users: ', err));

    servicesData.getAllServices()
      .then((response) => {
        this.setState({ allServices: response });
      })
      .catch((err) => console.error('Could not get all services: ', err));
  }

  render() {
    const { allUsers, allServices } = this.state;
    const userOptions = utils.optionsMaker(allUsers);
    const servicesOptions = utils.optionsMaker(allServices);

    const impactArray = utils.collectionMaker(lookupData.readAllLookupImpact());
    const impactOptions = utils.optionsMaker(impactArray);

    const severityArray = utils.collectionMaker(lookupData.readAllLookupSeverity());
    const severityOptions = utils.optionsMaker(severityArray);

    const statusArray = utils.collectionMaker(lookupData.readAllLookupStatusType());
    const statusOptions = utils.optionsMaker(statusArray);

    return (
      <div className="content">
        <div className="content-header">
          <h3>Create Incident</h3>
        </div>
        <div className="new-incident-container">
          <div className="new-incident-header">Incident Details</div>
          <div className="new-incident-form-content">
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Title</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">This is the title of the incident.</div>
              </div>
              <div className="new-incident-input">
                <input onChange={(event) => this.setState({ title: event.target.value })} className="form-control" type="text" id="incidentNameInput" placeholder="Incident Title" />
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Owner(s)</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The user(s) that have ownership of this incident.</div>
              </div>
              <div className="new-incident-input">
                <select onChange={(event) => this.setState({ owner: event.target.value })} className="form-control" id="incidentOwnerSelect" defaultValue={''} required>
                  <option value="">Select Owner</option>
                  <option value="" disabled>------------</option>
                  { userOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Severity</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current severity of the incident (based on overall impact and remediation effort).</div>
              </div>
              <div className="new-incident-input">
                <select onChange={(event) => this.setState({ severity: event.target.value })} className="form-control" id="incidentSeveritySelect" defaultValue={''} required>
                  <option value="">Select Severity</option>
                  <option disabled>------------</option>
                  { severityOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Impact</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current impact of the incident.</div>
              </div>
              <div className="new-incident-input">
                <select onChange={(event) => this.setState({ impact: event.target.value })} className="form-control" id="incidentImpactSelect" defaultValue={''} required>
                  <option value="">Select Impact</option>
                  <option disabled>------------</option>
                  { impactOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Status</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current status of the incident.</div>
              </div>
              <div className="new-incident-input">
                <select onChange={(event) => this.setState({ status: event.target.value })} className="form-control" id="incidentStatusSelect" defaultValue={''} required>
                  <option value="">Select Status</option>
                  <option disabled>------------</option>
                  { statusOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Description</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Describe the details of the incident.</div>
              </div>
              <div className="new-incident-input">
                <input onChange={(event) => this.setState({ description: event.target.value })} className="form-control" type="text" id="incidentDescriptionInput" placeholder="Incident Description" />
              </div>
            </div>
            <div className="form-row d-flex flex-row affected-services">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Affected Services</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Select all services impacted by this incident.</div>
              </div>
              <div className="new-incident-input">
                <select onChange={(event) => this.setState({ affectedServices: event.target.value })} className="form-control" id="incidentServicesSelect" defaultValue={''} required>
                  <option value="">Select Services</option>
                  <option disabled>------------</option>
                  { servicesOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Make Public</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Make this incident and its status visible to the public.</div>
              </div>
              <div className="new-incident-input-checkbox checkbox">
                <input onChange={(event) => this.setState({ is_public: !this.state.is_public })} type="checkbox" id="checkbox" name="isPublic" value="true" />
                <label htmlFor="checkbox"></label>
              </div>
            </div>
            <div className="form-row">
              <div className="incident-save-button d-flex justify-content-center py-auto">
                <button onClick={this.submitFormData} className="btn py-0">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewIncident;
