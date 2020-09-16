import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Home from '../components/Home/Home';
import Incidents from '../components/Incidents/Incidents';
import Navbar from '../components/Navbar/Navbar';
import Services from '../components/Services/Services';

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
        <Route path="/home" component={Home} authed={authed} />
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
