import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';

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
