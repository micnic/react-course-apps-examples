import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import WebSocket from "../store/WebSocket";
import _ from "lodash";
import { User } from "oidc-client";
import UserStore from "../store/UserStore";

export interface IChatState {
    message: string;
    chat: IMessage[];
    user: User;
}

export interface IServerMessage {
    added: Date;
    addedBy: string;
    applicationUserId: string;
    changed: Date;
    changedBy: string;
    content: string;
    id: string;
    isDeleted: boolean;
    applicationUser: IServerUser;
}

export interface IServerUser {
    email: string;
    userName: string;
    phoneNumber: string;
    normalizedUserName: string;
    id: string;
    emailConfirmed: boolean;
    twoFactorEnabled: boolean;
}

export interface IMessage {
    message: string;
    key: string;
    user: IUser;
    time: Date;
}

export interface IUser {
    id: string;
    name: string;
}

export default class Chat extends React.Component<RouteComponentProps<any>, {}> {
    private socket: WebSocket = null;
    private index: number = 0;
    state = {
        message: "",
        chat: [

        ] as IMessage[],
        user: UserStore.getUser()
    } as IChatState;
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }
    /**
     * On component load
     */
    componentDidMount(): void {
        if (this.socket == null) {
            this.socket = new WebSocket();
        }
        this.socket.register().on("OnReceive", (sender: any, message: string) => {
            this.updateChatState(message, sender);
        });

        fetch(`api/Chat/GetAll`)
            .then(response => response.json() as Promise<IServerMessage[]>)
            .then(data => {
                const { chat, user } = this.state;

                data.forEach(x => {
                    chat.push({
                        message: x.content,
                        key: `${this.index++}`,
                        user: {
                            name: (user.profile.name === x.applicationUser.userName) ? "you" : x.applicationUser.userName,
                            id: x.applicationUserId
                        },
                        time: x.added
                    } as IMessage);
                });

                this.setState({
                    chat
                });
            });
    }
    /*
     * On component unload
     */
    componentWillUnmount(): void {
        this.socket.disconnect();
    }
    /**
     * Update chat state
     * @param message
     * @param sender
     */
    private updateChatState(message: string, sender: any): void {
        const { chat } = this.state;
        chat.push({
            message: message,
            key: `${this.index++}`,
            user: {
                name: sender.userName,
                id: sender.id
            },
            time: new Date()
        } as IMessage);
        this.setState({
            chat
        });
    }
    /**
     * On click send
     * @param event
     */
    private send = (event: any) => {
        this.socket.sendMessage(this.state.message);
        this.setState({
            message: ""
        } as IChatState);

        this.updateChatState(this.state.message,
            {
                userName: "you",
                id: this.state.user.profile.sub
            });
    };
    /**
     * On text area change value event
     * @param event
     */
    private onChange = (event: any) => {
        this.setState({
            message: event.target.value as string
        } as IChatState);
    };
    /**
     * Attempt for enter key
     */
    private onInput = (event: any) => {
        if (event.key === "Enter") {
            this.send(null);
        }
    };

    /*
     * Render component
     */
    public render() {
        const { chat } = this.state;
        return (
            <React.Fragment>
                <Comment.Group>
                    <Header as="h2" dividing>
                        Chat
                        </Header>
                    {
                        chat.length === 0 ? <Header as="h4" dividing>
                            No messages
                                            </Header>
                            :
                            _.map(chat, item =>
                                <Comment key={item.key}>
                                    <Comment.Content>
                                        <Comment.Author as="a">{item.user.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{item.time.toLocaleString()}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{item.message}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            )
                    }
                    <Form reply>
                        <Form.TextArea onChange={this.onChange} value={this.state.message} onKeyPress={this.onInput} />
                        <Button onClick={this.send} content="Send" labelPosition="left" icon="edit" primary />
                    </Form>
                </Comment.Group>
            </React.Fragment>
        );
    }
}
