import React from 'react';
import { Link } from 'react-router-dom';

import './NavbarIncidentContext.scss';

class NavbarIncidentContext extends React.Component {
  render() {
    const { toggleSelected } = this.props;

    return (
      <div className="navbar-incident-context d-flex flex-column">
        <div className="context-header d-flex justify-content-center align-items-center">
          <svg className="teal-600" width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 9.667V15.5m0 5.833h.015m13.11-5.833a13.125 13.125 0 11-26.25 0 13.125 13.125 0 0126.25 0z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h4>Incidents</h4>
        </div>
        <div className="context-items d-flex flex-column">
          <Link onClick={toggleSelected} to="/incidents/new" className="context-item">Create Incident</Link>
          <Link onClick={toggleSelected} to="/incidents" className="context-item">Manage Incidents</Link>
        </div>
      </div>
    );
  }
}

export default NavbarIncidentContext;
