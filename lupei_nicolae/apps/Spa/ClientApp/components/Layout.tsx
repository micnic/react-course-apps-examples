import * as React from "react";
import { RouteComponentProps } from "react-router";
import { NavMenu } from "./NavMenu";
import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { User } from "oidc-client";
import UserStore from "../store/UserStore";
import { NavLink } from "react-router-dom";


export default class Layout extends React.Component<{}, {}> {
    state = {
        user: UserStore.getUser()
    };

    /**
     * On component load
     */
    componentDidMount(): void {

    }
    /**
     * Render view
     */
    public render() {
        const { user } = this.state;
        const leftItems = [
            { as: NavLink, content: "Home", key: "home", to: "/" },
            { as: NavLink, content: "Chat", key: "chat", to: "/chat" },
            { as: NavLink, content: "Timer", key: "timer", to: "/timer" },
            { as: NavLink, content: "Calculator", key: "calc", to: "/calc" },
            { as: NavLink, content: "TicTac", key: "tic", to: "/tictac" },
            { as: NavLink, content: "Notes", key: "note", to: "/notes" }
        ];
        const rightItems = [
            //{ as: "a", content: "Login", key: "login" },
            //{ as: "a", content: "Register", key: "register" }
        ];
        return (
            <React.Fragment>
                <NavMenu leftItems={leftItems} rightItems={rightItems} user={this.state.user}>
                    {this.props.children}
                </NavMenu>
            </React.Fragment >
        );
    }
}
