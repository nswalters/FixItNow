/* eslint-disable max-len */
import React, { Component } from 'react';

import Timeline from '../Timeline/Timeline';

import incidentsData from '../../helpers/data/incidents/incidentsData';
import notesData from '../../helpers/data/notes/notesData';
import servicesData from '../../helpers/data/services/servicesData';
import lookupData from '../../helpers/data/lookupData/lookupData';

import './ViewSingleIncident.scss';

class ViewSingleIncident extends Component {
  state = {
    incident: {},
    affectedServices: '',
    notes: [],
  }

  deleteIncident = (incidentId) => {
    incidentsData.destroyIncident(incidentId)
      .then(() => {
        this.props.history.push('/incidents/');
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
                this.setState({ incident: response.data });
              })
              .catch((err) => console.error('Could not get incident by incident id: ', err));
          } else {
            this.props.history.push('/incidents');
          }
        }
      })
      .catch((err) => console.error('Could not get user incidents by uid: ', err));

    incidentsData.getServiceIncidentsByIncidentId(incidentId)
      .then((response) => {
        servicesData.getServiceByServiceId(response[0].service_id)
          .then((resp) => {
            this.setState({ affectedServiceName: resp.data.name });
          });
      })
      .catch((err) => console.error('Could not get service incidents by incident id: ', err));

    notesData.getNotesByIncidentId(incidentId)
      .then((notes) => {
        this.setState({ notes });
      })
      .catch((err) => console.error('Could not get notes by incident id: ', err));
  }

  render() {
    const { incident, notes } = this.state;

    const luImpact = lookupData.readLookupImpact(incident.impact_id);
    const luStatusType = lookupData.readLookupStatusType(incident.status_type_id);
    const luSeverity = lookupData.readLookupSeverity(incident.severity_id);

    return (
      <div className="content">
        <div className="content-header">
          <h3>Incident Details</h3>
        </div>
        <div className="incident-details-container container">
          <div className="incident-info">
            <div className="top-row d-flex flex-row">
              <div className="view-badge d-flex justify-content-center align-items-center">
                <span className="view-badge-text mx-auto">{ incident.is_public ? 'Public' : 'Private' }</span>
              </div>
              <div className="incident-info-name flex-grow-1">{ incident.title }</div>
              <span className="incident-status-badge text-center py-auto" style={{ backgroundColor: luStatusType ? luStatusType.color : '' }}>{ luStatusType ? luStatusType.name : ''}</span>
            </div>
            <div className="mid-row d-flex flex-row">
              <div className="severity-badge d-flex align-items-center" style={{ backgroundColor: luSeverity ? luSeverity.color : '' }}>
                <span className="severity-badge-text">{ luSeverity ? luSeverity.name : '' }</span>
              </div>
              <div className="impact-badge flex-grow-1 my-auto" style={{ color: luImpact ? luImpact.color : '' }}>{ luImpact ? luImpact.name : '' }</div>
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
                <button onClick={() => this.props.history.push(`/incidents/${this.props.match.params.incident_id}/edit`)} className="btn py-0">Edit</button>
              </div>
    <span className="affected-service-badge text-center py-auto my-auto" style={{ backgroundColor: '#CBD5E0' }}><span className="affected-service-badge-text text-truncate tooltipTest">{this.state.affectedServiceName}<span className="tooltiptext">{this.state.affectedServiceName}</span></span></span>
              <div onClick={() => this.deleteIncident(this.props.match.params.incident_id)} className="incident-delete-button d-flex justify-content-center ml-auto py-auto">
                <button className="btn py-0">Delete</button>
              </div>
            </div>
          </div>
          <div className="incident-description">
            <div className="incident-description-header">Description</div>
            <div className="incident-description-body">
              <p>{ incident.description }</p>
            </div>
          </div>
          <Timeline notes={notes} />
        </div>
      </div>
    );
  }
}

export default ViewSingleIncident;
