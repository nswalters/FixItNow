import React from 'react';

import lookupData from '../../helpers/data/lookupData/lookupData';

class SingleServiceStatus extends React.Component {
  render() {
    const { service, withSpacer } = this.props;

    const impactName = lookupData.readLookupImpact(service.impact_id).name;
    const impactColor = lookupData.readLookupImpact(service.impact_id).color;

    return (
      <React.Fragment>
        <div className="service d-flex flex-row py-3">
          <div className="service-name">
            { service.name }
          </div>
          <div className="service-impact" style={{ color: impactColor }}>
            { impactName }
          </div>
        </div>
        { withSpacer ? (<div className="spacer"></div>) : ''}
      </React.Fragment>
    );
  }
}

export default SingleServiceStatus;
