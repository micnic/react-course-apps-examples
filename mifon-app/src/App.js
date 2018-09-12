import React, { Component } from 'react';
import './App.css';

import Form from './components/form';
import NoteItem from './components/NoteItem'

export default class App extends Component {
  noteList = JSON.parse(localStorage.getItem("notes")) || [];

  state = {
    notes: this.noteList,
    currentEditedProps: {
      index: this.noteList.length
    }
  };

  addNewNote = (note) => {
    let {notes} = this.state;

    notes[note.index] = note;

    localStorage.setItem('notes', JSON.stringify(notes));

    this.setState({
      notes: notes
    })
  };

  NoteUpdate = (note) => {
    this.setState({
      currentEditedProps: note
    });
  };

  render() {
    const {notes, currentEditedProps} = this.state;

    const Notes = notes.map((param, index) => {
      return(
        <NoteItem
        index={index}
        key={index}
        title={param.title}
        body={param.body}
        date={param.date}
        onUpdate={this.NoteUpdate}
      />
      )
    });

    return (
      <div className="App">
        <Form  {...currentEditedProps} onSave={this.addNewNote} />
        {Notes}
      </div>
    );
  }
}
