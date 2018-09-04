import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { Card, Header } from "semantic-ui-react";
import UserStore from "../store/UserStore";

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

    result: HTMLDivElement;

    callApi() {
        // quick and dirty test for calling the api
        axios.get("/values")
            .then((response: any) => {
                this.result.innerHTML = response.data;
            });
    }

    state = {
        user: UserStore.getUser()
    };

    public render() {
        const { user } = this.state;
        return <div>
            <Header as="h1">Welcome to app, {user.profile.name}</Header>
            <Card.Group>
                <Card
                    link
                    header="Chat"
                    meta="Demo"
                    description="Simple chat" />
                <Card
                    link
                    header="Calculator"
                    meta="Demo"
                    description="In development" />
                <Card
                    link
                    header="Time"
                    meta="Demo"
                    description="Simple timer" />
                <Card
                    link
                    header="Tic Tac"
                    meta="Demo"
                    description="Simple game" />
                <Card
                    link
                    header="Notes"
                    meta="Demo"
                    description="Simple notes" />
            </Card.Group>
        </div>;
    }
}
