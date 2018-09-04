import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";
import { Header, Icon, Button } from "semantic-ui-react";
import Guid from "../guid";

export interface IRow {
    cells: ICell[];
    key: string;
}

export interface ICell {
    event: any;
    checked: boolean;
    isCircle: boolean;
    key: string;
}

export interface ITicState {
    rows: IRow[];
    enabled: boolean;
    buttonValue: string;
}

export interface IEmpthyCell {
    cell: string;
    row: string;
}

const combinations = [
    [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
    ],
    [
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
    ],
    [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 }
    ],
    [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
    ],
    [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
    ],
    [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 }
    ],
    [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 }
    ],
    [
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
    ]
];

export default class TicTac extends React.Component<RouteComponentProps<any>, {}>
{
    /*
    * On click
    */
    private click = (id: any) => {
        const { enabled, rows } = this.state;
        if (enabled) {
            rows.map(r => {
                r.cells.map(c => {
                    if (c.key === id) {
                        c.checked = true;
                        c.isCircle = false;
                    }
                });
            });
            this.setState({ rows, enabled: false } as ITicState);
            const winner = this.checkWinnner();
            console.log(winner);
            if (winner === 0) {
                this.bot(null);
            }
            else if (winner === 1) {
                alert("You lose!");
                this.reset(null);
            }
            else {
                alert("You win");
                this.reset(null);
            }
        }
    }

    state = {
        rows: [] as IRow[],
        enabled: false,
        buttonValue: "Start"
    } as ITicState;
    /*
     * On component mount
     */
    componentDidMount() {
        const rows = [
            {
                cells: [
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell
                ] as ICell[],
                key: Guid.newGuid()
            } as IRow,
            {
                cells: [
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell
                ] as ICell[],
                key: Guid.newGuid()
            } as IRow,
            {
                cells: [
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell,
                    {
                        checked: false,
                        event: this.click,
                        isCircle: false
                    } as ICell
                ] as ICell[],
                key: Guid.newGuid()
            } as IRow
        ] as IRow[]
        for (let row in rows) {
            let index: number = 0;
            for (let cell in rows[row].cells) {
                rows[row].cells[cell].key = Guid.newGuid()
            }
            index = 0;
        }
        this.setState({
            rows: rows
        } as ITicState);
    }
    /**
     * Bot actions 
     */
    private bot = (event: any) => {
        const { enabled } = this.state;

        const { rows } = this.state;
        let data = this.getEmpthy();
        if (data.length != 0) {
            const index = this.getRandom(data.length);
            const { row, cell } = data[index];

            rows.map(r => {
                if (r.key === row) {
                    r.cells.map(c => {
                        if (c.key === cell) {
                            c.checked = true;
                            c.isCircle = true;
                        }
                    });
                }
            });

            this.setState({ enabled: true, rows } as ITicState);
            data = this.getEmpthy();
            if (data.length == 0) {
                alert("It's tie!");
                this.reset(null);
            }
        } else {
            alert("It's tie!");
            this.reset(null);
        }
    }
    /**
     *  Check winner
     */
    private checkWinnner(): number {
        var win = 0;
        const { rows } = this.state;
        let stop = false;
        combinations.map(x => {
            let circle = [false, false, false];
            let cros = [true, true, true];
            let check = [false, false, false];
            x.map((y, yIndex) => {
                const res = rows[y.x].cells[y.y].isCircle;
                circle[yIndex] = res;
                cros[yIndex] = res;
                check[yIndex] = rows[y.x].cells[y.y].checked;
            });
            if (!stop) {
                const checked = check.every(f => f === true);
                if (circle.every(f => f === true) && checked) {
                    win = 1;
                    stop = true;
                }
                if (cros.every(f => f === false) && checked) {
                    win = 2;
                    stop = true;
                }
            }
            circle = [false, false, false];
            cros = [true, true, true];
            check = [false, false, false];
        });
        return win;
    }
    /**
     * Get random number
     * @param max
     */
    private getRandom(max: number): number {
        let res = Math.floor(Math.random() * max);
        return res;
    }
    /**
     * Get empthy cells
     */
    private getEmpthy(): IEmpthyCell[] {
        const { rows } = this.state;
        let res = [];
        for (let row in rows) {
            const { cells } = rows[row];
            for (let cell in cells) {
                if (!cells[cell].checked) {
                    res.push({
                        row: rows[row].key,
                        cell: cells[cell].key
                    } as IEmpthyCell);
                }
            }
        }
        return res;
    }

    private start = (event: any) => {
        const { value } = event.target;

        if (value === "Start") {
            this.setState({ buttonValue: "Stop" } as ITicState);
            this.bot(null);
        } else {
            this.reset(null);
        }
    }
    private reset = (event: any) => {
        const { rows, enabled } = this.state;
        rows.map(r => {
            r.cells.map(c => {
                c.checked = false;
                c.isCircle = false;
            });
        });
        this.setState({ enabled: false, rows, buttonValue: "Start" } as ITicState);
    }
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /*
    * Render component
    */
    public render() {
        const { rows, buttonValue } = this.state;
        return (
            <React.Fragment>
                <Header as="h2" dividing>
                    Tic Tac
                        </Header>
                <table id="tictac">
                    <tbody>
                        {
                            _.map(rows, row =>
                                <tr key={row.key}>
                                    {
                                        _.map(row.cells, cell => <td onClick={() => this.click(cell.key)} key={cell.key}>
                                            {
                                                !cell.checked ? null :
                                                    cell.isCircle ? <Icon name="circle outline" size="large"></Icon> : <Icon name="close" size="large"></Icon>
                                            }
                                        </td>)
                                    }
                                </tr>
                            )}
                    </tbody>
                </table><br />
                <Button value={buttonValue} onClick={this.start}>{buttonValue}</Button>
                <Button style={{ marginLeft: "6em" }} onClick={this.reset}>Reset</Button>
            </React.Fragment>
        );
    }
}