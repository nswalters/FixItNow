import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';

// import firebase from 'firebase/app';
// import 'firebase/auth';

import fbConnection from '../helpers/data/connection';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';

fbConnection();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content-area">
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect from="*" to="/home"/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
