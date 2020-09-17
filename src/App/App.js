import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Home from '../components/Home/Home';
import Incidents from '../components/Incidents/Incidents';
import Navbar from '../components/Navbar/Navbar';
import Services from '../components/Services/Services';

import lookupData from '../helpers/data/lookupData/lookupData';

import './App.scss';

fbConnection();

// For potential use later

/*
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
*/

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed }) => {
  if (authed === null) {
    return (
      <div className="fas fa-spinner fa-spin" id="spinner" />
    );
  }
  return (
    <div className="content-area">
      <Switch>
        <Route path="/home" component={() => <Home authed={authed} />} />
        <PrivateRoute path="/services" component={Services} authed={authed} />
        <PrivateRoute path="/incidents" component={Incidents} authed={authed} />
        <Redirect from="*" to="/home"/>
      </Switch>
    </div>
  );
};

class App extends React.Component {
  state = {
    authed: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });

    if (!sessionStorage.getItem('lu_impact')) {
      lookupData.fetchLookupImpact()
        .then((response) => {
          sessionStorage.setItem('lu_impact', JSON.stringify(response.data));
        })
        .catch((err) => console.error('Could not fetch Impact data: ', err));
    }

    if (!sessionStorage.getItem('lu_status_type')) {
      lookupData.fetchLookupStatusType()
        .then((response) => {
          sessionStorage.setItem('lu_status_type', JSON.stringify(response.data));
        })
        .catch((err) => console.error('Could not fetch Status Type data: ', err));
    }

    if (!sessionStorage.getItem('lu_severity')) {
      lookupData.fetchLookupSeverity()
        .then((response) => {
          sessionStorage.setItem('lu_severity', JSON.stringify(response.data));
        })
        .catch((err) => console.error('Could not fetch Severity data: ', err));
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar authed={authed} />
          <RoutesContainer authed={authed} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
