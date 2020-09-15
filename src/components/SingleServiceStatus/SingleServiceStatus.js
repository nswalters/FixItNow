import React from 'react';

class SingleServiceStatus extends React.Component {
  render() {
    const { service, withSpacer } = this.props;

    return (
      <React.Fragment>
        <div className="service d-flex flex-row py-3">
          <div className="service-name">
            { service.name }
          </div>
          <div className="service-impact">
            {/* TODO: map this to the lu_impact value */}
            Operational
          </div>
        </div>
        { withSpacer ? (<div className="spacer"></div>) : ''}
      </React.Fragment>
    );
  }
}

export default SingleServiceStatus;
