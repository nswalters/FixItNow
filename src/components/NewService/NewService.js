/* eslint-disable max-len */
import React, { Component } from 'react';

import lookupData from '../../helpers/data/lookupData/lookupData';
import servicesData from '../../helpers/data/services/servicesData';
import usersData from '../../helpers/data/users/usersData';
import utils from '../../helpers/utils';

import './NewService.scss';

class NewService extends Component {
  state = {
    allUsers: [],
    description: '',
    impact: '',
    is_public: false,
    name: '',
    owner: '',
    uid: this.props.uid,
  }

  submitFormData = () => {
    const serviceObject = {
      created_at: Date.now(),
      created_by: this.state.uid,
      description: this.state.description,
      impact_id: this.state.impact,
      is_public: this.state.is_public,
      name: this.state.name,
    };

    servicesData.createNewService(serviceObject)
      .then((response) => {
        const createdServiceId = response.data.name;
        const serviceUserObject = {
          service_id: createdServiceId,
          user_id: this.state.uid,
        };
        servicesData.createServiceUser(serviceUserObject);

        return createdServiceId;
      })
      .then((createdServiceId) => {
        this.props.history.push(`/services/${createdServiceId}`);
      });
  }

  componentDidMount() {
    usersData.getAllUsers()
      .then((response) => {
        this.setState({ allUsers: utils.collectionMaker(response.data) });
      })
      .catch((err) => console.error('Could not get all users: ', err));
  }

  render() {
    const { allUsers } = this.state;
    const userOptions = utils.optionsMaker(allUsers);

    const impactArray = utils.collectionMaker(lookupData.readAllLookupImpact());
    const impactOptions = utils.optionsMaker(impactArray);

    return (
      <div className="content">
        <div className="content-header">
          <h3>Create Service</h3>
        </div>
        <div className="new-service-container">
          <div className="new-service-header">Settings</div>
          <div className="new-service-form-content">
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-service-form-label d-flex flex-row">
                  <div id="new-service-name-label">Name</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-service-name-help">This is the name of the service.</div>
              </div>
              <div className="new-service-input">
                <input onChange={(event) => this.setState({ name: event.target.value })} className="form-control" type="text" id="serviceNameInput" placeholder="Service Name" />
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-service-form-label d-flex flex-row">
                  <div id="new-service-name-label">Owner</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-service-name-help">The user(s) that have ownership of this service.</div>
              </div>
              <div className="new-service-input">
                <select onChange={(event) => this.setState({ owner: event.target.value })} className="form-control" id="serviceOwnerSelect" defaultValue={''} required>
                  <option value="">Select Owner</option>
                  <option disabled>------------</option>
                  { userOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-service-form-label d-flex flex-row">
                  <div id="new-service-name-label">Impact</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-service-name-help">The current impact of the service.</div>
              </div>
              <div className="new-service-input">
                <select onChange={(event) => this.setState({ impact: event.target.value })} className="form-control" id="serviceImpactSelect" defaultValue={''} required>
                  <option value="">Select Impact</option>
                  <option disabled>------------</option>
                  { impactOptions }
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-service-form-label d-flex flex-row">
                  <div id="new-service-name-label">Description</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-service-name-help">Describe the service's function within your environment.</div>
              </div>
              <div className="new-service-input">
                <input onChange={(event) => this.setState({ description: event.target.value })} className="form-control" type="text" id="serviceDescriptionInput" placeholder="Service Description" />
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-service-form-label d-flex flex-row">
                  <div id="new-service-name-label">Make Public</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-service-name-help">Make this service and its status visible to the public.</div>
              </div>
              <div className="new-service-input-checkbox checkbox">
                <input onChange={(event) => this.setState({ is_public: !this.state.is_public })} type="checkbox" id="checkbox" name="" value="isPublic" />
                <label htmlFor="checkbox"></label>
              </div>
            </div>
            <div className="form-row">
              <div className="service-save-button d-flex justify-content-center py-auto">
                <button onClick={this.submitFormData} className="btn py-0">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewService;
