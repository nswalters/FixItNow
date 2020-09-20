import React from 'react';

import ManageSingleService from '../ManageSingleService/ManageSingleService';

import servicesData from '../../helpers/data/services/servicesData';

import './ManageServices.scss';

class ManageServices extends React.Component {
  state = {
    userServices: [],
  }

  componentDidMount() {
    const { uid } = this.props;

    servicesData.getUserServicesByUid(uid)
      .then((userServices) => {
        this.setState({ userServices });
      })
      .catch((err) => console.error('Could not get services by uid: ', err));
  }

  render() {
    const { userServices } = this.state;

    const allUserServices = userServices.map((service) => (
      <ManageSingleService key={service.id} service={service} history={this.props.history} />));

    return (
      <div className="content">
        <div className="content-header">
          <h3>Manage Services</h3>
        </div>
        <div className="service-list-container container">
          { allUserServices }
        </div>
      </div>
    );
  }
}

export default ManageServices;
