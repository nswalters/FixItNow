/* eslint-disable max-len */
import React, { Component } from 'react';

class TimelineNote extends Component {
  render() {
    const { note, leftBorder } = this.props;

    return (
      <div className="timeline-data-note">
        <div className="timeline-data-note-header d-flex flex-row">
          <svg width="16" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h6m-6 4h6m2 5H3a2 2 0 01-2-2V3a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="box"></div>
          <div className={`note-content ${leftBorder} top d-flex flex-column`}>
            <div className="note-author">{ note.created_by }</div>
            <div className="note-timestamp">{ String(new Date(parseInt(note.created_at, 10)))}</div>
            <div className="note-text">{ note.content }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineNote;
