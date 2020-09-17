import React, { Component } from 'react';

import lookupData from '../../helpers/data/lookupData/lookupData';

import './SingleIncidentNotice.scss';

class SingleIncidentNotice extends Component {
  render() {
    const { incident } = this.props;

    const impactName = lookupData.readLookupImpact(incident.impact_id).name;
    const impactColor = lookupData.readLookupImpact(incident.impact_id).color;
    const statusTypeName = lookupData.readLookupStatusType(incident.status_type_id).name;
    const statusTypeColor = lookupData.readLookupStatusType(incident.status_type_id).color;

    return (
      <div className="active-incident">
        <div className="notice-container" style={{ backgroundColor: impactColor }}>
          <div className="active-incident d-flex flex-row justify-content-between align-items-center px-3">
            <span className="header py-2">Active Incident</span>
            <span className="secondary">Updated 5 minutes ago</span>
          </div>
        </div>
        <div className="details-container" style={{ borderColor: impactColor }}>
          <div className="notice-container">
            <div className="active-incident-details d-flex flex-row justify-content-between align-items-center px-3" style={{ backgroundColor: impactColor }}>
              <span className="header py-2">{incident.title}</span>
              <span className="secondary">{impactName}</span>
            </div>
          </div>
          <div className="notice-container-details">
            <div className="active-incident-details-status d-flex flex-row justify-content-between align-items-center px-3">
              <span className="incident-status-badge my-2 text-center py-auto" style={{ backgroundColor: statusTypeColor }}>{ statusTypeName }</span>
              <span className="incident-update">{incident.description}</span>
              <span className="incident-last-update-time">Nov 24, 2020 06:34AM UTC</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleIncidentNotice;
