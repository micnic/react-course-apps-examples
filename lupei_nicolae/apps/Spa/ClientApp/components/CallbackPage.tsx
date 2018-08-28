import * as React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { User } from "oidc-client";
import { push } from "react-router-redux";
import userManager from "./../userManager";

import { RouteComponentProps } from "react-router";
import { Loader } from "semantic-ui-react";

class CallbackPage extends React.Component<RouteComponentProps<{}> & { dispatch: any }, {}> {

    successCallback = (user: User) => {
        // get the user's previous location, passed during signinRedirect()
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        var redirectPath = user.state.path as string;
        this.props.dispatch(push(redirectPath));
    }

    errorCallback = (error: Error) => {
        console.log(error);
        this.props.dispatch(push("/"));
    }

    render() {
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={this.successCallback}
                errorCallback={this.errorCallback}>
                <Loader active inline="centered" />
            </CallbackComponent>
        );
    }
}

export default connect()(CallbackPage);
