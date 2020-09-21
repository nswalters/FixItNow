import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import CurrentStatus from '../CurrentStatus/CurrentStatus';
import SingleIncidentNotice from '../SingleIncidentNotice/SingleIncidentNotice';

import incidentsData from '../../helpers/data/incidents/incidentsData';

import './Home.scss';

class Home extends React.Component {
  state = {
    heroShown: true,
    incidents: [],
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  showHero = (authed) => (
      <div className="hero-container container">
          <div className="hero mx-auto">
            <svg onClick={ this.hideHero } className="gray-600" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 14L14 2M2 2l12 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>FiN - Fix it Now!</h1>
            <h4 className="mx-auto d-flex text-center align-items-center">Your single stop for incident management and service status updates.</h4>
            { authed ? '' : (
            <div className="hero-login-button d-flex justify-content-center">
              <button className="btn bg-teal-600" onClick={this.loginClickEvent}>Login Today!</button>
            </div>)}
          </div>
        </div>
  );

  hideHero = () => {
    this.setState({ heroShown: false });
  }

  componentDidMount() {
    incidentsData.getAllPublicIncidents()
      .then((incidents) => {
        const filterResolvedIncidents = incidents.filter((incident) => incident.status_type_id !== 'status_type02');
        this.setState({ incidents: filterResolvedIncidents });
      })
      .catch((err) => console.error('Could not get incidents: ', err));
  }

  render() {
    const { incidents } = this.state;
    const { authed } = this.props;

    const allIncidents = incidents.map((incident) => (
      <SingleIncidentNotice key={incident.id} incident={incident} />
    ));

    return (
      <div className="content">
        <div className="content-header">
          <h3 className="teal-600">Fix it Now!</h3>
        </div>
        <div className="container">
          {this.state.heroShown ? this.showHero(authed) : ''}
          {this.state.incidents.length > 0 ? allIncidents : ''}
          <CurrentStatus />
        </div>
      </div>
    );
  }
}

export default Home;
