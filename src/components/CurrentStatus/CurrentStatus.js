import React from 'react';

import './CurrentStatus.scss';

class CurrentStatus extends React.Component {
  render() {
    return (
      <div className="current-status-container container">
        <div className="current-service-status-header text-center">Current Service Status</div>
        <div className="service-details-container">
          <div className="service d-flex flex-row py-3">
            <div className="service-name">
              Message Queue
            </div>
            <div className="service-impact">
              Operational
            </div>
          </div>
          <div className="spacer"></div>
          <div className="service d-flex flex-row py-3">
            <div className="service-name">
              Website
            </div>
            <div className="service-impact">
              Operational
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentStatus;
