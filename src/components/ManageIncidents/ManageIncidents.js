import React from 'react';

import ManageSingleIncident from '../ManageSingleIncident/ManageSingleIncident';

import incidentsData from '../../helpers/data/incidents/incidentsData';

import './ManageIncidents.scss';

class ManageIncidents extends React.Component {
  state = {
    userIncidents: [],
  }

  componentDidMount() {
    const { uid } = this.props;

    incidentsData.getUserIncidentsByUid(uid)
      .then((userIncidents) => {
        this.setState({ userIncidents });
      })
      .catch((err) => console.error('Could not get incidents by uid: ', err));
  }

  render() {
    const { userIncidents } = this.state;

    const allUserIncidents = userIncidents.map((incident) => (
      <ManageSingleIncident key={incident.id} incident={incident} history={this.props.history} />));

    return (
      <div className="content">
        <div className="content-header">
          <h3>Manage Incidents</h3>
        </div>
        <div className="incident-list-container container">
          { allUserIncidents }
        </div>
      </div>
    );
  }
}

export default ManageIncidents;
