import React, { Component } from 'react';
import uuid from 'uuid';

class AddNote extends Component {
constructor(){
    super();
    this.state = { 
        newNote:{
            id:'',
            content:''
        }
     };
}

    handleSubmit(e){
        e.preventDefault();
        if(this.refs.content.value === ''){
            alert("Can't create empty note, write something!");
        } else {
            this.setState({
                newNote:{
                    id: uuid.v4(),
                    content: this.refs.content.value,
                }
            },() => {
                // console.log(this.state);
                this.props.addNote(this.state.newNote);
            });
        }
    };
    render() {
        return (
            <React.Fragment>

                <form className="note-editor" onSubmit={this.handleSubmit.bind(this)}>
                    <textarea
                        className="textarea"
                        placeholder="Create a new note..."
                        rows={3}
                        ref='content'
                       
                       >
                    </textarea>
                    <div className="controls">
                        <input type="submit" className="add-note-button" value="Add Note" />
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default AddNote;