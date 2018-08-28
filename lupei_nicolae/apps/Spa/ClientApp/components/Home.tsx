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
                    meta="Scientist"
                    description={[
                        "Rick is a genius scientist whose alcoholism and reckless,",
                        " nihilistic behavior are a source of concern for his family.",
                    ].join("")} />
                <Card
                    link
                    header="Calculator"
                    meta="Scientist"
                    description={[
                        "Rick is a genius scientist whose alcoholism and reckless,",
                        " nihilistic behavior are a source of concern for his family.",
                    ].join("")} />
                <Card
                    link
                    header="Time"
                    meta="Scientist"
                    description={[
                        "Rick is a genius scientist whose alcoholism and reckless,",
                        " nihilistic behavior are a source of concern for his family.",
                    ].join("")} />
            </Card.Group>
        </div>;
    }
}
