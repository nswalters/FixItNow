import React, { Component } from 'react';

import './IncidentNotice.scss';

class IncidentNotice extends Component {
  render() {
    return (
      <div className="active-incident">
        <div className="notice-container">
          <div className="active-incident d-flex flex-row justify-content-between align-items-center px-3">
            <span className="header py-2">Active Incident</span>
            <span className="secondary">Updated 5 minutes ago</span>
          </div>
        </div>
        <div className="details-container">
          <div className="notice-container">
            <div className="active-incident-details d-flex flex-row justify-content-between align-items-center px-3">
              <span className="header py-2">Increased Volume of HTTP 500 Errors</span>
              <span className="secondary">Degraded Performance</span>
            </div>
          </div>
          <div className="notice-container-details">
            <div className="active-incident-details-status d-flex flex-row justify-content-between align-items-center px-3">
              <span className="incident-status py-2">Increased Volume of HTTP 500 Errors</span>
              <span className="incident-update">Degraded Performance</span>
              <span className="last-update-time">Nov 24, 2020 06:34AM UTC</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IncidentNotice;
