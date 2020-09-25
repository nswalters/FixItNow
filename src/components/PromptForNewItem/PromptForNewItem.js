import React, { Component } from 'react';

class PromptForNewItem extends Component {
  render() {
    const { props } = this.props;

    return (
      <div className="hero-container container">
        <div className="hero mx-auto">
            {this.props.isService ? (
              <h1>Create a Service</h1>
            ) : (
              <h1>Create an Incident</h1>
            )}
          <h4 className="mx-auto d-flex text-center align-items-center">Click the button below to get started.</h4>
          <div className="hero-login-button d-flex justify-content-center">
            {this.props.isService ? (
              <button className="btn bg-teal-600" onClick={() => { props.history.push('/services/new'); }}>Create Service</button>
            ) : (
              <button className="btn bg-teal-600" onClick={() => { props.history.push('/incidents/new'); }}>Create Incident</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PromptForNewItem;
