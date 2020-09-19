/* eslint-disable max-len */
import React, { Component } from 'react';

import './NewIncident.scss';

class NewIncident extends Component {
  render() {
    return (
      <div className="content">
        <div className="content-header">
          <h3>Create Incident</h3>
        </div>
        <div className="new-incident-container">
          <div className="new-incident-header">Incident Details</div>
          <div className="new-incident-form-content">
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Title</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">This is the title of the incident.</div>
              </div>
              <div className="new-incident-input">
                <input className="form-control" type="text" id="incidentNameInput" placeholder="Incident Title" />
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Owner</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The user(s) that have ownership of this incident.</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentOwnerSelect" defaultValue={''} required>
                  <option value="">Select Owner</option>
                  <option value="" disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Severity</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current severity of the incident (based on overall impact and remediation effort).</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentSeveritySelect" defaultValue={''} required>
                  <option value="">Select Severity</option>
                  <option disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Impact</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current impact of the incident.</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentImpactSelect" defaultValue={''} required>
                  <option value="">Select Impact</option>
                  <option disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Status</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The current status of the incident.</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentStatusSelect" defaultValue={''} required>
                  <option value="">Select Status</option>
                  <option disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Description</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Describe the details of the incident.</div>
              </div>
              <div className="new-incident-input">
                <input className="form-control" type="text" id="incidentDescriptionInput" placeholder="Incident Description" />
              </div>
            </div>
            <div className="form-row d-flex flex-row affected-services">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Affected Services</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Select all services impacted by this incident.</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentServicesSelect" defaultValue={''} required>
                  <option value="">Select Services</option>
                  <option disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Assignees</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">The user(s) that have been assigned this incident.</div>
              </div>
              <div className="new-incident-input">
                <select className="form-control" id="incidentAssigneeSelect" defaultValue={''} required>
                  <option value="">Select Assignees</option>
                  <option disabled>------------</option>
                  <option value="test">Test</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="new-incident-form-label d-flex flex-row">
                  <div id="new-incident-name-label">Make Public</div>
                  <div className="helper-icon">
                    <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.5a6 6 0 11-12 0 6 6 0 0112 0zm-6-2.25a.75.75 0 00-.65.375.75.75 0 11-1.298-.75A2.25 2.25 0 117.5 7.122v.128a.75.75 0 01-1.5 0V6.5a.75.75 0 01.75-.75.75.75 0 000-1.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#2C5282"/></svg>
                  </div>
                </div>
                <div id="new-incident-name-help">Make this incident and its status visible to the public.</div>
              </div>
              <div className="new-incident-input-checkbox checkbox">
                <input type="checkbox" id="checkbox" name="" value="isPublic" />
                <label htmlFor="checkbox"></label>
              </div>
            </div>
            <div className="form-row">
              <div className="incident-save-button d-flex justify-content-center py-auto">
                <button className="btn py-0">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewIncident;
