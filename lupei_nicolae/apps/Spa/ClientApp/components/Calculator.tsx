import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Comment, Form, Header, List, Input } from "semantic-ui-react";
import _ from "lodash";

export interface ICalcState {
    target: string;
    resolved: boolean;
    inProgress: boolean;
    value: number;
    prevalue: number;
}

export default class Calculator extends React.Component<RouteComponentProps<any>, {}> {
    state = {
        target: "0",
        resolved: true,
        inProgress: false,
        value: 0,
        prevalue: 0
    } as ICalcState;

    /**
     * On number tap
     */
    private numberTap = (event: any) => {
        const num = parseInt(event.target.value);
        const { resolved, inProgress, target } = this.state;
        if (!inProgress) {
            if (target !== "0") {
                this.setState({
                    target: `${target}${num}`
                });
            } else {
                this.setState({
                    target: `${num}`
                });
            }
        } else
            if (resolved) {
                this.setState({
                    value: num,
                    target: `${num}`
                } as ICalcState);
            }
    };

    /**
     * On operator tap
     */
    private operatorTap = (event: any) => {
        this.setState({
            inProgress: true
        } as ICalcState);
        const operator = event.target.value;
        switch (operator) {
            case "+":
                {

                } break;
            case "-":
                {

                } break;
            case "/":
                {

                } break;
            case "*":
                {

                } break;
        }
    }

    /*
     * Render component
     */
    public render() {
        const { target } = this.state;
        return (

            <React.Fragment>
                <Header as="h2" dividing>
                    Calculator
                </Header>
                <Input id="calcValue" value={target} /><br />
                <div id="calculator">
                    <Button.Group>
                        <Button content="ce" />
                        <Button content="c" />
                        <Button content="<" />
                        <Button content="/" value="/" onClick={this.operatorTap} />
                    </Button.Group><br />
                    <Button.Group>
                        <Button content="7" value="7" onClick={this.numberTap} />
                        <Button content="8" value="8" onClick={this.numberTap} />
                        <Button content="9" value="9" onClick={this.numberTap} />
                        <Button content="*" value="*" onClick={this.operatorTap} />
                    </Button.Group><br />
                    <Button.Group>
                        <Button content="4" value="4" onClick={this.numberTap} />
                        <Button content="5" value="5" onClick={this.numberTap} />
                        <Button content="6" value="6" onClick={this.numberTap} />
                        <Button content="-" value="-" onClick={this.operatorTap} />
                    </Button.Group><br />
                    <Button.Group>
                        <Button content="1" value="1" onClick={this.numberTap} />
                        <Button content="2" value="2" onClick={this.numberTap} />
                        <Button content="3" value="3" onClick={this.numberTap} />
                        <Button content="+" value="+" onClick={this.operatorTap} />
                    </Button.Group><br />
                    <Button.Group>
                        <Button content="+-" />
                        <Button content="0" value="0" onClick={this.numberTap} />
                        <Button content="." />
                        <Button content="=" />
                    </Button.Group>
                </div>
            </React.Fragment>
        );
    }
}
