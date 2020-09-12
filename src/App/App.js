import React from 'react';
import './App.scss';

import Navbar from '../components/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="content-area">
          <h3>ContentArea</h3>
        </div>
      </div>
    );
  }
}

export default App;
