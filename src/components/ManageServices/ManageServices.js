import React from 'react';

import ManageSingleService from '../ManageSingleService/ManageSingleService';

import servicesData from '../../helpers/data/services/servicesData';

import './ManageServices.scss';

class ManageServices extends React.Component {
  state = {
    userServices: [],
  }

  updateUserServices = (uid) => {
    servicesData.getUserServicesByUid(uid)
      .then((userServices) => {
        this.setState({ userServices });
      })
      .catch((err) => console.error('Could not get services by uid: ', err));
  }

  deleteService = (serviceId) => {
    servicesData.destroyService(serviceId)
      .then(() => {
        this.updateUserServices(this.props.uid);
      })
      .catch((err) => console.error('Could not delete service by service id: ', err));
  }

  componentDidMount() {
    const { uid } = this.props;

    this.updateUserServices(uid);
  }

  render() {
    const { userServices } = this.state;
    const { uid } = this.props;

    // console.error('render', this.props, this.state);

    const allUserServices = userServices.filter((record) => (!!record)).map((service) => (
      <ManageSingleService key={service.id} service={service} history={this.props.history} deleteService={this.deleteService} uid={uid} />
    ));

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
