/* eslint-disable max-len */
import React, { Component } from 'react';

import incidentsData from '../../helpers/data/incidents/incidentsData';
import lookupData from '../../helpers/data/lookupData/lookupData';

import './ViewSingleIncident.scss';

class ViewSingleIncident extends Component {
  state = {
    incident: {},
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
  }

  render() {
    const { incident } = this.state;

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
                <button className="btn py-0">Edit</button>
              </div>
              <span className="affected-service-badge text-center py-auto my-auto" style={{ backgroundColor: '#CBD5E0' }}>Website</span>
              <div className="incident-delete-button d-flex justify-content-center ml-auto py-auto">
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
          <div className="incident-timeline">
            <div className="incident-timeline-header">Timeline</div>
            <input className="incident-note-form form-control" type="text" placeholder="Add a note..."></input>
            <div className="timeline-data">
              <div className="timeline-data-note">
                <div className="timeline-data-note-header d-flex flex-row">
                  <svg width="16" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h6m-6 4h6m2 5H3a2 2 0 01-2-2V3a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div className="box"></div>
                  <div className="note-content note-left-border top d-flex flex-column">
                    <div className="note-author">John Doe</div>
                    <div className="note-timestamp">Nov 24, 2020 13:52 UTC</div>
                    <div className="note-text">I think we are going to need to increase the maximum CPU capacity in the webserver farm and auto-scale to support the new load profile.</div>
                  </div>
                </div>
              </div>
              <div className="timeline-data-note">
                <div className="timeline-data-note-header d-flex flex-row">
                  <svg width="16" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h6m-6 4h6m2 5H3a2 2 0 01-2-2V3a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div className="box"></div>
                  <div className="note-content top d-flex flex-column">
                    <div className="note-author">Jane Doe</div>
                    <div className="note-timestamp">Nov 24, 2020 12:02 UTC</div>
                    <div className="note-text">So far, I’m seeing extremely high CPU contention and thrashing happening within our main webserver farm.  This mostly hosts our GIF servers for cat videos.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSingleIncident;
