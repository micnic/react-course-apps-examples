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
    operator: string;
}

export default class Calculator extends React.Component<RouteComponentProps<any>, {}> {
    state = {
        target: "0",
        resolved: true,
        inProgress: false,
        value: 0,
        prevalue: 0,
        operator: null
    } as ICalcState;

    /**
     * On number tap
     */
    private numberTap = (event: any) => {
        const num = parseInt(event.target.value);
        const { resolved, inProgress, target } = this.state;
        console.log(num, target);
        if (!inProgress) {
            this.target(target, num);
        } else
            if (resolved) {
                this.setState({
                    value: num,
                    target: `${num}`
                } as ICalcState);
            }
            else {
                this.target(target, num);
            }
    };
    /**
     * Change value in input
     * @param target
     * @param num
     */
    private target(target: string, num: number) {
        if (target !== "0") {
            this.setState({
                target: `${target}${num}`
            });

            this.setState({
                value: parseInt(this.state.target)
            });
        } else {
            this.setState({
                target: `${num}`
            });
            this.setState({
                value: parseInt(this.state.target)
            });
        }
    };

    /**
     * On operator tap
     */
    private operatorTap = (event: any) => {
        const { value } = this.state;
        const operator = event.target.value;
        this.setState({
            inProgress: true,
            prevalue: value,
            operator,
            resolved: false,
            target: ""
        } as ICalcState);
    }

    /**
     * Resolve
     */
    private resolve = (event: any) => {
        const { value, prevalue } = this.state;
        console.log(value, prevalue);
        const target = this.getValue(value, prevalue);
        this.setState({
            target
        });
    }
    /**
     * Get value
     * @param prev
     * @param next
     */
    private getValue(prev, next): number {
        let response = 0;
        const { operator } = this.state;
        switch (operator) {
            case "+": {
                response = prev + next;
            } break;
            case "-": {
                response = prev - next;
            } break;
            case "/": {
                response = prev / next;
            } break;
            case "*": {
                response = prev * next;
            } break;
        }
        return response;
    }
    /*
     * Reset
     */
    private resetData = (event: any) => {
        this.reset();
    }
    /*
     * Reset
     */
    private reset(): void {
        this.setState({
            resolved: true,
            prevalue: 0,
            value: 0,
            operator: null,
            target: "0",
            inProgress: false
        } as ICalcState);
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
                        <Button content="ce" onClick={this.resetData} />
                        <Button content="c" onClick={this.resetData} />
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
                        <Button content="=" onClick={this.resolve} />
                    </Button.Group>
                </div>
            </React.Fragment>
        );
    }
}
