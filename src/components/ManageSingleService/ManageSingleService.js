/* eslint-disable max-len */
import React, { Component } from 'react';

import './ManageSingleService.scss';

class ManageSingleService extends Component {
  render() {
    const { service } = this.props;

    return (
      <div className="service-details">
        <div className="top-row d-flex flex-row">
        <div onClick={() => this.props.history.push(`/services/${service.id}`)} className="service-details-name">{ service.name }</div>
          <div className="view-badge ml-auto mt-4 d-flex justify-content-center align-items-center">
            <span className="view-badge-text mx-auto">{ service.is_public ? 'Public' : 'Private' }</span>
          </div>
        </div>
        <div className="bottom-row d-flex flex-row">
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
          <div className="service-delete-button d-flex justify-content-center ml-auto py-auto">
            <button className="btn py-0">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageSingleService;
