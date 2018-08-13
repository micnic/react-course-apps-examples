import React, { Component } from 'react';
import NoteItem from './NoteItem';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        let noteItems;
        if(this.props.notes){
            noteItems = this.props.notes.map(note => {
                // console.log(note);
                return(
                    <NoteItem key={note.id} note={note} />
                );
            });
        }
    
        return (
            <div className="Notes">
                <h1>Notes App!</h1>
                {noteItems}
            </div>
        );
    }
}

export default Notes;