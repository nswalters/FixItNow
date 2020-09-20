/* eslint-disable max-len */
import React, { Component } from 'react';

import servicesData from '../../helpers/data/services/servicesData';
import lookupData from '../../helpers/data/lookupData/lookupData';
import utils from '../../helpers/utils';

import './EditSingleService.scss';

class ViewSingleService extends Component {
  state = {
    description: '',
    service: {},
    name: '',
    impact: '',
    showOptionsMenu: false,
    uid: this.props.uid,
    is_public: '',
    created_by: '',
    created_at: '',
  }

  submitFormData = () => {
    const serviceObj = {
      updated_at: Date.now(),
      updated_by: this.state.uid,
      description: this.state.description,
      impact_id: this.state.impact,
      is_public: this.state.is_public,
      name: this.state.name,
      created_by: this.state.created_by,
      created_at: this.state.created_at,
    };

    servicesData.updateService(this.props.match.params.service_id, serviceObj)
      .then((response) => {
        const updatedServiceId = response.data.name;
        this.props.history.push(`/services/${updatedServiceId}`);
      });
  }

  componentDidMount() {
    const serviceId = this.props.match.params.service_id;
    const { uid } = this.props;

    /* Check if user is assigned to this service, if not, redirect */
    servicesData.getUserServicesByUid(uid)
      .then((userServices) => {
        if (userServices) {
          if (userServices.find((userService) => userService.id === serviceId)) {
            servicesData.getServiceByServiceId(serviceId)
              .then((response) => {
                this.setState({
                  service: response.data,
                  name: response.data.name,
                  impact: response.data.impact_id,
                  description: response.data.description,
                  is_public: response.data.is_public,
                  created_by: response.data.created_by,
                  created_at: response.data.created_at,
                });
              })
              .catch((err) => console.error('Could not get service by service id: ', err));
          } else {
            this.props.history.push('/services');
          }
        }
      })
      .catch((err) => console.error('Could not get user services by uid: ', err));
  }

  render() {
    const { service } = this.state;

    const luImpact = lookupData.readLookupImpact(service.impact_id);
    const impactArray = utils.collectionMaker(lookupData.readAllLookupImpact());
    const impactOptions = utils.optionsMaker(impactArray);

    return (
      <div className="content">
        <div className="content-header">
          <h3>Service Details</h3>
        </div>
        <div className="service-details-container container">
          <div className="service-info">
            <div className="top-row d-flex flex-row">
              <select onChange={() => this.setState({ is_public: !this.state.is_public })} className="view-badge d-flex justify-content-center align-items-center" id="editPublicStatus" defaultValue={''} required>
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
              <div className="service-info-name flex-grow-1">
                <input onChange={(event) => this.setState({ name: event.target.value })} className="form-control" type="text" id="editServiceNameInput" defaultValue={ service.name } />
              </div>
            </div>
            <div className="mid-row d-flex flex-row">
              <div className="severity-badge d-flex align-items-center"></div>
              <select
                onChange={(event) => this.setState({ impact: event.target.value })}
                className="impact-badge flex-grow-1 my-auto"
                style={{ color: luImpact ? luImpact.color : '' }}
                id="editImpact" value={this.state.impact}
                required
              >
                { impactOptions }
              </select>
              <div className="service-owners d-flex flex-row">
                <div className="individual-owner d-flex flex-row">
                  <svg className="owner-icon my-auto" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.125 6a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0h-14z" fill="#1A202C"/></svg>
                  <span className="owner-text my-auto">John Smith</span>
                </div>
                <div className="team-owner d-flex flex-row">
                  <svg className="owner-icon my-auto" width="19" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.125 3a3 3 0 11-6 0 3 3 0 016 0zm5 2a2 2 0 11-4 0 2 2 0 014 0zm-4 7a4 4 0 10-8 0v3h8v-3zm-8-7a2 2 0 11-4 0 2 2 0 014 0zm10 10v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0118.125 12v3h-3zM3.875 9.094A5.973 5.973 0 003.125 12v3h-3v-3a3 3 0 013.75-2.906z" fill="#1A202C"/></svg>
                  <span className="owner-text my-auto">Engineering</span>
                </div>
                <div className="owner-more-icon my-auto d-flex justify-content-center align-items-center">
                  <span className="owner-more-icon-text">+1</span>
                </div>
              </div>
            </div>
            <div className="bottom-row d-flex flex-row">
              <div className="service-edit-button d-flex justify-content-center py-auto">
                <button onClick={ this.submitFormData } className="btn py-0">Save</button>
              </div>
              <div className="service-delete-button d-flex justify-content-center ml-auto py-auto">
                <button className="btn py-0">Delete</button>
              </div>
            </div>
          </div>
          <div className="service-description">
            <div className="service-description-header">Description</div>
            <div className="service-description-body">
              <div>
                <textarea defaultValue={ service.description } rows={10} cols={120} onChange={(event) => { this.setState({ description: event.target.value }); }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSingleService;
