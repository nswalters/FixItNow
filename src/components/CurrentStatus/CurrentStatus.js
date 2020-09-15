import React from 'react';

import SingleServiceStatus from '../SingleServiceStatus/SingleServiceStatus';

import servicesData from '../../helpers/data/services/servicesData';

import './CurrentStatus.scss';

class CurrentStatus extends React.Component {
  state = {
    services: [],
  }

  componentDidMount() {
    servicesData.getAllPublicServices()
      .then((services) => {
        this.setState({ services });
      })
      .catch((err) => console.error('Could not get services: ', err));
  }

  render() {
    const { services } = this.state;

    const allServices = services.map((service, idx, arr) => (
      <SingleServiceStatus key={service.id} service={service} withSpacer={idx !== arr.length - 1}/>));

    const displayServiceStatus = () => {
      if (services.length) {
        return (
          <div className="current-status-container container">
            <div className="current-service-status-header text-center">Current Service Status</div>
            <div className="service-details-container">
              { allServices }
            </div>
          </div>
        );
      }

      return '';
    };

    return (
      <React.Fragment>
        { displayServiceStatus() }
      </React.Fragment>
    );
  }
}

export default CurrentStatus;
