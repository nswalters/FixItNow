/* eslint-disable max-len */
import React, { Component } from 'react';

import TimelineNote from '../TimelineNote/TimelineNote';

import notesData from '../../helpers/data/notes/notesData';

import './Timeline.scss';

class Timeline extends Component {
  state = {
    noteContent: '',
    changeNotes: this.props.changeNotes,
  }

  saveNote = () => {
    const noteObj = {
      content: this.state.noteContent,
      created_at: Date.now(),
      created_by: this.props.uid,
      incident_id: this.props.match.params.incident_id,
    };

    notesData.createNote(noteObj)
      .then(() => {
        this.state.changeNotes(noteObj.incident_id);
        this.setState({ noteContent: '' });
      });
  }

  render() {
    const { notes } = this.props;

    const timelineNotes = notes.map((note, idx, arr) => <TimelineNote key={note.id} note={note} leftBorder={(idx < arr.length - 1) ? 'note-left-border' : '' } />);

    return (
      <div className="incident-timeline">
        <div className="d-flex flex-row justify-content-between">
          <div className="incident-timeline-header">Timeline</div>
          <div className="incident-save-note-button d-flex justify-content-center py-auto">
            <button onClick={this.saveNote} className="btn py-0">Save Note</button>
          </div>
        </div>
        <input
          onChange={(event) => this.setState({ noteContent: event.target.value })}
          className="incident-note-form form-control"
          type="text"
          value={this.state.noteContent}
          placeholder="Add a note..." />
        <div className="timeline-data">
          { timelineNotes }
        </div>
      </div>
    );
  }
}

export default Timeline;
