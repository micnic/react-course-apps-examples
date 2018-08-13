import React, { Component } from 'react';

class NoteItem extends Component {
    render() {
        return (
            <div id={this.props.note.id} className="note-item">
                 <p>
                 {this.props.note.content}
                 </p>
                <span className="close-x">&times;</span>
            </div>
        );
    }
}

export default NoteItem;