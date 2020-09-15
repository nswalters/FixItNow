import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import CurrentStatus from '../CurrentStatus/CurrentStatus';

import './Home.scss';

class Home extends React.Component {
  state = {
    heroShown: true,
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  showHero = () => (
      <div className="hero-container container">
          <div className="hero mx-auto">
            <svg onClick={ this.hideHero } className="gray-600" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 14L14 2M2 2l12 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>FiN - Fix it Now!</h1>
            <h4 className="mx-auto d-flex text-center align-items-center">Your single stop for incident management and service status updates.</h4>
            <div className="hero-login-button d-flex justify-content-center">
              <button className="btn bg-teal-600" onClick={this.loginClickEvent}>Login Today!</button>
            </div>
          </div>
        </div>
  );

  hideHero = () => {
    this.setState({ heroShown: false });
  }

  render() {
    return (
      <div className="content">
        <div className="content-header">
          <h3 className="teal-600">Fix it Now!</h3>
        </div>
        {this.state.heroShown ? this.showHero() : ''}
        <CurrentStatus />
      </div>
    );
  }
}

export default Home;
