import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Comment, Form, Header, List } from "semantic-ui-react";
import _ from "lodash";

export interface ITimerState {
    running: boolean;
    logs: string[];
    time: number;
    h: number;
    s: number;
    m: number;
};


export default class Timer extends React.Component<RouteComponentProps<any>, {}> {
    state = {
        running: false,
        time: 0,
        h: 0,
        m: 0,
        s: 0,
        logs: []
    } as ITimerState;
    /**
     * Interval
     */
    private interval: any = null;

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

    }
    /*
     * On component unload
     */
    componentWillUnmount(): void {

    }
    /**
     * Start timer
     */
    private startTimer = (event: any) => {
        const { running } = this.state;
        if (!running) {
            this.setState({
                running: true
            } as ITimerState);
            this.interval = setInterval(this.timer, 1);
        }
    }
    private refresh(): void {
        const { time } = this.state;
        if (time >= 100) {
            clearInterval(this.interval);
            this.interval = setInterval(this.timer, 1);
        }
    }
    /**
     * Timer
     */
    private timer = () => {
        let { time, s } = this.state;
        this.setState({ time: time + 1 } as ITimerState);
        if (time >= 1000) {
            this.setState({
                time: 0,
                s: s + 1
            });
        }
        s = this.state.s;
        let { m } = this.state;
        if (s >= 60) {
            this.setState({
                m: m + 1,
                s: 0
            });
        }
        m = this.state.m;
        const { h } = this.state;
        if (m >= 60) {
            this.setState({
                m: 0,
                h: h + 1
            });
        }

        this.refresh();
    }
    /**
     * Stop timer
     */
    private stopTimer = (event: any) => {
        clearInterval(this.interval);
        this.setState({
            running: false
        } as ITimerState);

        const { logs } = this.state;
        const { h, m, s, time } = this.state;
        logs.push(`${h} hours ${m} minutes ${s} seconds ${time} milliseconds`);
        this.setState({ logs });
    }
    /**
     * Reset timer
     */
    private resetTimer = (event: any) => {
        clearInterval(this.interval);
        this.setState({
            running: false,
            time: 0, s: 0, h: 0, m: 0
        } as ITimerState);

    }

    /*
     * Render component
     */
    public render() {

        return (
            <React.Fragment>
                <Header as="h2" dividing>
                    Timer
                </Header>
                <Button.Group>
                    <Button labelPosition="left" icon="play" content="Start" onClick={this.startTimer} />
                    <Button icon="stop" content="Stop" onClick={this.stopTimer} />
                    <Button labelPosition="right" icon="shuffle" content="Reset" onClick={this.resetTimer} />
                </Button.Group>
                <span style={{ padding: "3em" }}></span>
                <Button.Group className="timerRight">
                    <Button>{this.state.h}</Button>
                    <Button.Or></Button.Or>
                    <Button>{this.state.m}</Button>
                    <Button.Or />
                    <Button>{this.state.s}</Button>
                    <Button.Or />
                    <Button>{this.state.time}</Button>
                </Button.Group>
                <Header as="h2" dividing>
                    Logs
                </Header>
                <List items={this.state.logs} />
            </React.Fragment>
        );
    }
}
