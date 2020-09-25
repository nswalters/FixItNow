/* eslint-disable max-len */
import React, { Component } from 'react';

import notesData from '../../helpers/data/notes/notesData';
import usersData from '../../helpers/data/users/usersData';

import './TimelineNote.scss';

class TimelineNote extends Component {
  state = {
    created_by_first_name: '',
    created_by_last_name: '',
    changeNotes: this.props.changeNotes,
  }

  deleteNote = () => {
    notesData.deleteNote(this.props.note.id)
      .then(() => {
        this.state.changeNotes(this.props.note.incident_id);
      })
      .catch((err) => console.error('Could not delete note: ', err));
  }

  componentDidMount() {
    usersData.getUserByUid(this.props.note.created_by)
      .then((userData) => {
        if (userData) {
          this.setState({ created_by_first_name: userData.first_name });
          this.setState({ created_by_last_name: userData.last_name });
        } else {
          this.setState({ created_by_name: '<UNKNOWN USER>' });
        }
      })
      .catch((err) => console.error('could not get user by uid: ', err));
  }

  render() {
    const { note, leftBorder, uid } = this.props;

    return (
      <div className="timeline-data-note">
        <div className="timeline-data-note-header d-flex flex-row">
          <svg className="note-icon" width="16" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h6m-6 4h6m2 5H3a2 2 0 01-2-2V3a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="box"></div>
          <div className={`note-content ${leftBorder} top d-flex flex-column`}>
            <div className="d-flex flex-row justify-content-between">
              <div className="note-author">{ this.state.created_by_first_name } { this.state.created_by_last_name }</div>
              {uid !== note.created_by ? '' : (<svg onClick={this.deleteNote} className="note-delete-icon" width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 5l-.867 12.142A2 2 0 0113.138 19H4.862a2 2 0 01-1.995-1.858L2 5m14 0h-4m4 0h1M2 5h4M2 5H1m5 0h6M6 5V2a1 1 0 011-1h4a1 1 0 011 1v3M7 9v6m4-6v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
            </div>
            <div className="note-timestamp">{ String(new Date(parseInt(note.created_at, 10))) }</div>
            <div className="note-text">{ note.content }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineNote;
