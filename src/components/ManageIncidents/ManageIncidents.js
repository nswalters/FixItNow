import React from 'react';

import ManageSingleIncident from '../ManageSingleIncident/ManageSingleIncident';
import PromptForNewItem from '../PromptForNewItem/PromptForNewItem';

import incidentsData from '../../helpers/data/incidents/incidentsData';

import './ManageIncidents.scss';

class ManageIncidents extends React.Component {
  state = {
    userIncidents: [],
    showHero: false,
  }

  updateUserIncidents = (uid) => {
    incidentsData.getUserIncidentsByUid(uid)
      .then((userIncidents) => {
        this.setState({ userIncidents });
        if (userIncidents.length === 0) {
          this.setState({ showHero: true });
        }
      })
      .catch((err) => console.error('Could not get incidents by uid: ', err));
  }

  deleteIncident = (incidentId) => {
    incidentsData.destroyIncident(incidentId)
      .then(() => {
        this.updateUserIncidents(this.props.uid);
      })
      .catch((err) => console.error('Could not delete incident by incident id: ', err));
  }

  componentDidMount() {
    const { uid } = this.props;

    this.updateUserIncidents(uid);
  }

  render() {
    const { userIncidents, showHero } = this.state;

    const allUserIncidents = userIncidents.map((incident) => (
      <ManageSingleIncident key={incident.id} incident={incident} history={this.props.history} deleteIncident={this.deleteIncident} />));

    return (
      <div className="content">
        <div className="content-header">
          <h3>Manage Incidents</h3>
        </div>
        <div className="incident-list-container container">
          { showHero ? <PromptForNewItem props={this.props} /> : allUserIncidents }
        </div>
      </div>
    );
  }
}

export default ManageIncidents;
