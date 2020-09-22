/* eslint-disable max-len */
import React, { Component } from 'react';

import TimelineNote from '../TimelineNote/TimelineNote';

import './Timeline.scss';

class Timeline extends Component {
  render() {
    const { notes } = this.props;

    const timelineNotes = notes.map((note, idx, arr) => <TimelineNote note={note} leftBorder={(idx < arr.length - 1) ? 'note-left-border' : '' } />);

    return (
      <div className="incident-timeline">
        <div className="incident-timeline-header">Timeline</div>
        <input className="incident-note-form form-control" type="text" placeholder="Add a note..."></input>
        <div className="timeline-data">
          { timelineNotes }
        </div>
      </div>
    );
  }
}

export default Timeline;
