import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Header, Button, Modal, Form, TextArea, Input } from "semantic-ui-react";
import _ from "lodash";
import Guid from "../guid";
import TicTac from "./TicTac";

export interface INote {
    name: string;
    content: string;
    added: string;
    id: string;
}
export interface INoteState {
    notes: INote[];
    title: string;
    content: string;
    cTitle: string;
    cContent: string;
}

export default class Notes extends React.Component<RouteComponentProps<{}>, {}> {

    state = {
        notes: [] as INote[],
        title: "",
        content: "",
        cContent: "",
        cTitle: ""
    } as INoteState;

    private load(): void {
        fetch(`api/Note/GetAll`)
            .then(response => response.json() as Promise<INote[]>)
            .then(data => {
                console.log(data);
                this.setState({ notes: data } as INoteState);
            });
    }

    componentDidMount() {
        this.load();
    }

    private deleteNote = (event: any) => {
        const { value } = event.target;

        fetch(`api/Note/Delete?id=${value}`, {
            method: "DELETE"
        })
            .then(response => response as any)
            .then(data => {
                const res = data as boolean;
                if (res) {
                    alert("Note are deleted!");
                } else {
                    alert("Fail to delete note");
                }
                this.load();
            });
    }


    private addNote = (event: any) => {
        const { title, content } = this.state;

        const model = { name: title, content } as INote;

        fetch(`api/Note/Add?data=${JSON.stringify(model)}`, {
            headers: { 'Content-Type': "application/json" },
            method: "POST"
        })
            .then(response => response as any)
            .then(data => {
                const res = data as boolean;
                if (res) {
                    alert("Note are added!");
                } else {
                    alert("Fail to add note");
                }
                this.load();
            });

        //after server
        this.setState({ title: "", content: "" });
    }

    private onTitleChange = (event: any) => {
        const { value } = event.target;
        this.setState({ title: value } as INoteState);
    }

    private onContentChange = (event: any) => {
        const { value } = event.target;
        this.setState({ content: value } as INoteState);
    }

    private open = (event: any) => {
        const { value } = event.target;
        const { notes } = this.state;
        const [toOpen] = notes.filter((x) => {
            return x.id === value;
        });
        this.setState({ cTitle: toOpen.name, cContent: toOpen.content } as INoteState);
    }

    constructor(props) {
        super(props);
    }


    public render() {
        const { notes, title, content, cTitle, cContent } = this.state;

        return (<React.Fragment>
            <Header as="h2" dividing>
                Notes
                        </Header>
            <Modal trigger={<Button>Add note</Button>}>
                <Modal.Header>Add new note</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Input onChange={this.onTitleChange} className="customSpace" value={title} placeholder="Title..." />
                            <TextArea onChange={this.onContentChange} className="customSpace" value={content} placeholder="Note content" />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.addNote}>Add</Button>
                </Modal.Actions>
            </Modal>
            <table className="ui celled structured table">
                <thead>
                    <tr><td>Title</td><td>Added</td><td>Actions</td></tr>
                </thead>
                <tbody>
                    {
                        notes.length === 0 ? null :
                            _.map(notes, note =>
                                <tr key={note.id}>
                                    <td>{(note as INote).name}</td>
                                    <td>{(note as INote).added}</td>
                                    <td>
                                        <Button value={(note as INote).id} onClick={this.deleteNote}>Delete</Button>
                                        <Modal trigger={<Button value={(note as INote).id} onClick={this.open}>Open note</Button>}>
                                            <Modal.Header>{cTitle}</Modal.Header>
                                            <Modal.Content>
                                                <Modal.Description>
                                                    <Form>
                                                        <TextArea className="customSpace" value={cContent} placeholder="Note content" />
                                                    </Form>
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button primary onClick={this.addNote}>Add</Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </React.Fragment>);
    }
}