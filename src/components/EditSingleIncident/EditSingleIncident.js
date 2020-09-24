/* eslint-disable max-len */
import React, { Component } from 'react';

import Timeline from '../Timeline/Timeline';

import incidentsData from '../../helpers/data/incidents/incidentsData';
import notesData from '../../helpers/data/notes/notesData';
import servicesData from '../../helpers/data/services/servicesData';
import lookupData from '../../helpers/data/lookupData/lookupData';
import utils from '../../helpers/utils';

import './EditSingleIncident.scss';

class EditSingleIncident extends Component {
  state = {
    incident: {},
    allServices: [],
    notes: [],
    affectedServices: '',
    created_at: '',
    created_by: '',
    description: '',
    impact_id: '',
    is_public: '',
    severity_id: '',
    status_type_id: '',
    title: '',
    uid: this.props.uid,
  }

  changeNotes = (incidentId) => {
    notesData.getNotesByIncidentId(incidentId)
      .then((notes) => {
        notes.sort((a, b) => ((a.created_at > b.created_at) ? 1 : -1)).reverse();
        this.setState({ notes });
      })
      .catch((err) => console.error('Could not get notes by incident id: ', err));
  }

  submitFormData = () => {
    const incidentObj = {
      created_at: this.state.created_at,
      created_by: this.state.created_by,
      updated_at: Date.now(),
      description: this.state.description,
      impact_id: this.state.impact_id,
      is_public: this.state.is_public,
      severity_id: this.state.severity_id,
      status_type_id: this.state.status_type_id,
      title: this.state.title,
    };

    const editedIncidentId = this.props.match.params.incident_id;

    incidentsData.updateIncident(editedIncidentId, incidentObj)
      .then(() => {
        const serviceIncidentObj = {
          incident_id: editedIncidentId,
          service_id: this.state.affectedServices,
        };

        incidentsData.getServiceIncidentsByIncidentId(editedIncidentId)
          .then((resp) => {
            incidentsData.updateServiceIncident(resp[0].id, serviceIncidentObj)
              .then(() => {
                this.props.history.push(`/incidents/${editedIncidentId}`);
              });
          });
      });
  }

  deleteIncident = (incidentId) => {
    incidentsData.destroyIncident(incidentId)
      .then(() => {
        this.props.history.push('/incidents');
      })
      .catch((err) => console.error('Could not delete incident by incident id: ', err));
  }

  componentDidMount() {
    const incidentId = this.props.match.params.incident_id;
    const { uid } = this.props;

    /* Check if user is assigned to this incident, if not, redirect */
    incidentsData.getUserIncidentsByUid(uid)
      .then((userIncidents) => {
        if (userIncidents) {
          if (userIncidents.find((userIncident) => userIncident.id === incidentId)) {
            incidentsData.getIncidentByIncidentId(incidentId)
              .then((response) => {
                this.setState({
                  incident: response.data,
                  created_at: response.data.created_at,
                  created_by: response.data.created_by,
                  description: response.data.description,
                  impact_id: response.data.impact_id,
                  is_public: response.data.is_public,
                  severity_id: response.data.severity_id,
                  status_type_id: response.data.status_type_id,
                  title: response.data.title,
                });
              })
              .catch((err) => console.error('Could not get incident by incident id: ', err));
          } else {
            this.props.history.push('/incidents');
          }
        }
      })
      .catch((err) => console.error('Could not get user incidents by uid: ', err));

    servicesData.getAllServices()
      .then((response) => {
        this.setState({ allServices: response });
      })
      .catch((err) => console.error('Could not get all services: ', err));

    incidentsData.getServiceIncidentsByIncidentId(incidentId)
      .then((response) => {
        this.setState({ affectedServices: response[0].service_id });
        servicesData.getServiceByServiceId(response[0].service_id)
          .then((resp) => {
            this.setState({ affectedServiceName: resp.data.name });
          });
      })
      .catch((err) => console.error('Could not get service incidents by incident id: ', err));

    this.changeNotes(incidentId);
  }

  render() {
    const { incident, allServices, notes } = this.state;

    const serviceOptions = utils.optionsMaker(allServices);

    const luImpact = lookupData.readLookupImpact(incident.impact_id);
    const impactArray = utils.collectionMaker(lookupData.readAllLookupImpact());
    const impactOptions = utils.optionsMaker(impactArray);

    const luStatusType = lookupData.readLookupStatusType(incident.status_type_id);
    const statusArray = utils.collectionMaker(lookupData.readAllLookupStatusType());
    const statusOptions = utils.optionsMaker(statusArray);

    const luSeverity = lookupData.readLookupSeverity(incident.severity_id);
    const severityArray = utils.collectionMaker(lookupData.readAllLookupSeverity());
    const severityOptions = utils.optionsMaker(severityArray);

    return (
      <div className="content">
        <div className="content-header">
          <h3>Incident Details</h3>
        </div>
        <div className="incident-details-container container">
          <div className="edit-incident-info">
            <div className="top-row d-flex flex-row">
              <select onChange={(event) => this.setState({ is_public: Boolean(parseInt(event.target.value, 2)) })} className="view-badge d-flex justify-content-center align-items-center" id="editPublicStatus" value={this.state.is_public ? 1 : 0} required>
                <option value="1">Public</option>
                <option value="0">Private</option>
              </select>
                <input onChange={(event) => this.setState({ title: event.target.value })} className="form-control incident-info-name" type="text" id="editServiceNameInput" defaultValue={ incident.title} />
              <select
                onChange={(event) => this.setState({ status_type_id: event.target.value })}
                className="incident-status-badge text-center py-auto"
                style={{ backgroundColor: luStatusType ? luStatusType.color : '' }}
                id="editStatusType" value={this.state.status_type_id}
                required
              >
                { statusOptions }
              </select>
            </div>
            <div className="mid-row d-flex flex-row">
              <select
                onChange={(event) => this.setState({ severity_id: event.target.value })}
                className="severity-badge severity-badge-text d-flex justify-content-around align-items-center"
                style={{ backgroundColor: luSeverity ? luSeverity.color : '' }}
                id="editSeverity" value={this.state.severity_id}
                required
              >
                { severityOptions }
              </select>
              <select
                onChange={(event) => this.setState({ impact_id: event.target.value })}
                className="impact-badge flex-grow-1 my-auto"
                style={{ color: luImpact ? luImpact.color : '' }}
                id="editImpact" value={this.state.impact_id}
                required
              >
                { impactOptions }
              </select>
              <div className="incident-owners d-flex flex-row">
                <div className="individual-owner d-flex flex-row">
                  <svg className="owner-icon my-auto" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.125 6a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0h-14z" fill="#1A202C"/></svg>
                  <span className="owner-text my-auto">John Smith</span>
                </div>
                <div className="team-owner d-flex flex-row">
                  <svg className="owner-icon my-auto" width="19" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.125 3a3 3 0 11-6 0 3 3 0 016 0zm5 2a2 2 0 11-4 0 2 2 0 014 0zm-4 7a4 4 0 10-8 0v3h8v-3zm-8-7a2 2 0 11-4 0 2 2 0 014 0zm10 10v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0118.125 12v3h-3zM3.875 9.094A5.973 5.973 0 003.125 12v3h-3v-3a3 3 0 013.75-2.906z" fill="#1A202C"/></svg>
                  <span className="owner-text my-auto">Engineering</span>
                </div>
                <div className="owner-more-icon my-auto d-flex justify-content-center align-items-center">
                  <span className="owner-more-icon-text">+1</span>
                </div>
              </div>
            </div>
            <div className="bottom-row d-flex flex-row">
              <div className="incident-edit-button d-flex justify-content-center py-auto">
                <button onClick={ this.submitFormData } className="btn py-0">Save</button>
              </div>
              <select
                onChange={(event) => this.setState({ affectedServices: event.target.value })}
                className="affected-service-badge text-center py-auto my-auto"
                style={{ backgroundColor: '#CBD5E0' }}
                id="editIncidentServices" value={this.state.affectedServices}
              >
                { serviceOptions }
              </select>
              <div onClick={() => this.deleteIncident(this.props.match.params.incident_id)} className="incident-delete-button d-flex justify-content-center ml-auto py-auto">
                <button className="btn py-0">Delete</button>
              </div>
            </div>
          </div>
          <div className="incident-description">
            <div className="incident-description-header">Description</div>
            <div className="incident-description-body">
              <div>
                <textarea defaultValue={ incident.description } rows={10} cols={120} onChange={(event) => { this.setState({ description: event.target.value }); }}/>
              </div>
            </div>
          </div>
          <Timeline notes={notes} uid={this.props.uid} history={this.props.history} match={this.props.match} changeNotes={this.changeNotes} />
        </div>
      </div>
    );
  }
}

export default EditSingleIncident;
