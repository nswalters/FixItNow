/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

import NavbarIncidentContext from '../NavbarIncidentContext/NavbarIncidentContext';
import NavbarProfileContext from '../NavbarProfileContext/NavbarProfileContext';
import NavbarServiceContext from '../NavbarServiceContext/NavbarServiceContext';

class Navbar extends React.Component {
  state = {
    isServiceSelected: false,
    isIncidentSelected: false,
    isProfileSelected: false,
  }

  toggleServiceSelected = () => {
    this.setState({ isServiceSelected: !this.state.isServiceSelected });
    this.setState({ isIncidentSelected: false });
    this.setState({ isProfileSelected: false });
  }

  toggleIncidentSelected = () => {
    this.setState({ isIncidentSelected: !this.state.isIncidentSelected });
    this.setState({ isServiceSelected: false });
    this.setState({ isProfileSelected: false });
  }

  toggleProfileSelected = () => {
    this.setState({ isProfileSelected: !this.state.isProfileSelected });
    this.setState({ isServiceSelected: false });
    this.setState({ isIncidentSelected: false });
  }

  showNavbarContext = (authed) => {
    if (this.state.isServiceSelected) {
      return <NavbarServiceContext toggleSelected={this.toggleServiceSelected} />;
    }
    if (this.state.isIncidentSelected) {
      return <NavbarIncidentContext toggleSelected={this.toggleIncidentSelected} />;
    }
    if (this.state.isProfileSelected) {
      return <NavbarProfileContext toggleSelected={this.toggleProfileSelected} authed={authed} />;
    }

    return '';
  }

  render() {
    const { authed } = this.props;

    const linkHome = () => {
      this.setState({ isServiceSelected: false });
      this.setState({ isIncidentSelected: false });
      if (window.location.pathname === '/home') {
        window.location.reload();
      }
    };

    const showTopicItems = () => {
      if (authed) {
        return (
          <div className="topic-items mx-auto d-flex flex-column">
            <div onClick={ this.toggleServiceSelected } className={`topic-item d-flex justify-content-center align-items-center ${this.state.isServiceSelected ? 'selected' : ''}`}>
              <svg className="teal-600" width="31" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.292 13.5h20.416m-20.416 0a2.917 2.917 0 01-2.917-2.916V4.75a2.917 2.917 0 012.917-2.917h20.416a2.917 2.917 0 012.917 2.917v5.834a2.917 2.917 0 01-2.917 2.916m-20.416 0a2.917 2.917 0 00-2.917 2.917v5.833a2.917 2.917 0 002.917 2.917h20.416a2.917 2.917 0 002.917-2.917v-5.833a2.917 2.917 0 00-2.917-2.917m-2.916-5.833h.014m-.014 11.666h.014" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div onClick={ this.toggleIncidentSelected } className={`topic-item d-flex justify-content-center align-items-center ${this.state.isIncidentSelected ? 'selected' : ''}`}>
              <svg className="teal-600" width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 9.667V15.5m0 5.833h.015m13.11-5.833a13.125 13.125 0 11-26.25 0 13.125 13.125 0 0126.25 0z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        );
      }
      return <div></div>;
    };

    return (
      <div>
        <div className="custom-navbar d-flex flex-column justify-content-between">
          <Link onClick={linkHome} to="/home" className="brand-icon-container">
            <svg className="brand-icon yellow-400" fill="none" width="37" height="37" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.875 1.625v3.75m0 0h11.25m-11.25 0h-3.75a3.75 3.75 0 00-3.75 3.75v3.75m18.75-11.25v3.75m0 0h3.75a3.75 3.75 0 013.75 3.75v3.75m-18.75 18.75v3.75m0-3.75h-3.75a3.75 3.75 0 01-3.75-3.75v-3.75m7.5 7.5h11.25m0 0v3.75m0-3.75h3.75a3.75 3.75 0 003.75-3.75v-3.75m-26.25-11.25h-3.75m3.75 0v11.25m0 0h-3.75m33.75-11.25h-3.75m0 0v11.25m3.75 0h-3.75m-18.75-11.25h11.25v11.25h-11.25v-11.25z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div className="custom-nav-items d-flex flex-column justify-content-between">
            {showTopicItems()}
            <div onClick={ this.toggleProfileSelected } className={`user-profile mx-auto ${this.state.isProfileSelected ? 'selected' : ''}`}>
              <svg className="teal-600" width="37" height="37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.602 29.383s0 0 0 0zm0 0A26.135 26.135 0 0118.5 26c4.687 0 9.088 1.228 12.898 3.382m-25.796 0a16.876 16.876 0 0025.796 0m-25.796 0A16.874 16.874 0 011.625 18.5a16.875 16.875 0 1129.773 10.882m0 0s0 0 0 0zM24.125 14.75a5.625 5.625 0 11-11.25 0 5.625 5.625 0 0111.25 0z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
        { this.showNavbarContext(authed) }
      </div>
    );
  }
}

export default Navbar;
