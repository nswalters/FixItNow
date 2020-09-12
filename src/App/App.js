import React from 'react';
import './App.scss';

import Navbar from '../components/Navbar/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="content-area">
        </div>
      </div>
    );
  }
}

export default App;
