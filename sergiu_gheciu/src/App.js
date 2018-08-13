import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid'; 
import Notes from './Components/Notes';
import AddNote from './Components/AddNote';

class App extends Component {
  constructor(){
    super();
    this.state = {
      notes: []
    };
  }
  componentDidMount(){
    this.setState({
      notes: [
        {
          id:uuid.v4(),
          content:'Note first'
        },
        {
          id:uuid.v4(),
          content:'Note second'
        },
        {
          id:uuid.v4(),
          content:'Note third'
        }
      ]
    });
  }


  handleAddNote(note){
    let notes=this.state.notes;
    notes.push(note);
    this.setState(
      {notes: notes}
    );
  }

  render() {
    return (
      <React.Fragment>
        <Notes notes={this.state.notes} />     
        <AddNote addNote={this.handleAddNote.bind(this)}/>   
      </React.Fragment> 
    );
  }
}

export default App;
