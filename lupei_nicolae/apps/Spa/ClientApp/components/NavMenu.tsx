import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import _ from "lodash";
import userManager from "./../userManager";
import {
    Container,
    Icon,
    Image,
    Menu,
    Sidebar,
    Responsive
} from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { Route } from "react-router";

const NavBarMobile = ({
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
}) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                items={leftItems}
                vertical
                visible={visible}
            />
            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPusherClick}
                style={{ minHeight: "100vh" }}>
                <Menu fixed="top" inverted>
                    <Menu.Item>
                        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
                    </Menu.Item>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {_.map(rightItems, item => <Menu.Item {...item} />)}
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

const onLogoutButtonClicked = (event: any) => {
    event.preventDefault();
    userManager.signoutRedirect();
    userManager.removeUser();
};

const options = [
    { key: "user", text: "Account", icon: "user" },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "sign-out", text: "Sign Out", icon: "sign out", onClick: onLogoutButtonClicked },
];

const trigger = ({ user }) => (
    <span>
        <Image avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/poormini/128.jpg" />
    </span>
);

const NavBarDesktop = ({ leftItems, rightItems, user }) => (
    <Menu fixed="top" inverted>
        <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        {_.map(leftItems, item => <Menu.Item {...item} />)}
        <Menu.Menu position="right">
            {_.map(rightItems, item => <Menu.Item {...item} />)}
            <div style={{ padding: "1em" }}>
                <Dropdown trigger={trigger(user)} options={options} pointing="top left" icon={null} /> <span style={{ color: "white" }}>{user.profile.name}</span>
            </div>
        </Menu.Menu>
    </Menu>
);

const NavBarChildren = ({ children }) => (
    <Container style={{ marginTop: "5em" }}>{children}</Container>
);

export class NavMenu extends React.Component<any, any> {

    state = {
        visible: false
    };

    handlePusher = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    redirect = () => {

    }

    public render() {

        const { children, leftItems, rightItems, user } = this.props;
        const { visible } = this.state;

        return (
            <React.Fragment>
                <Responsive {...Responsive.onlyMobile}>
                    <NavBarMobile
                        leftItems={leftItems}
                        onPusherClick={this.handlePusher}
                        onToggle={this.handleToggle}
                        rightItems={rightItems}
                        visible={visible}>
                        <NavBarChildren>{children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop leftItems={leftItems} rightItems={rightItems} user={user} />
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>
            </React.Fragment>
        );
    }
}   