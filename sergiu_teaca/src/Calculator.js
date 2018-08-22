import React, { Component } from 'react';
import './Calculator.css';

const Button = (props) => {
  return (
    <button value={props.value} name={props.type} onClick={props.handleClick}> {props.value} </button>
  );
};

const Display = (props) => {
  return (
    <div className="display">
      {props.data}
    </div>
  );
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      buttons: ['0'],
      result: false
    };
  }

  handleClick = (e) => {
    this.calculate(e.target.value, e.target.name);
  };

  handleKeyPress = (event) => {
    let type = '';
    const keyValue = String.fromCharCode(event.keyCode);
    console.log(event.keyCode);
    console.log(keyValue);
    if (event.keyCode === 27) {
      type = 'clear';
    }
    else if (event.keyCode === 13 || event.keyCode === 61) {
      type = 'equal'
    }
    else if (this.calculatorValues.numbers.includes(keyValue)) {
      type = 'numbers'
    }
    else if (this.calculatorValues.operations.includes(keyValue)) {
      type = 'operations'
    }

    console.log(type);
    
    if (type) {
      this.calculate(keyValue, type);
    }
  };

  componentWillMount(){
    document.addEventListener("keypress", this.handleKeyPress);
  }

  calculate(value, type) {
    let { display, buttons, result} = this.state;
    let lastButton = buttons[buttons.length - 1];
    
    switch (type) {
      case 'clear':
        display = '0';
        buttons = [display];
        break;
      case 'numbers':
        if (result === true) {
          display = 0;
          buttons = ['0'];
          lastButton = 0;
        }
        if (buttons.length === 1 && value === '0' && lastButton === '0') {}
        else if (buttons.length === 1 && value !== '0' && value !== '.' && lastButton === '0') {
          display = value;
          buttons = [value];
        }
        else if (value === '.') {
          let display_split = display.split(/[-*/+]+/);
          if (display_split[display_split.length -1].includes(".")) {}
          else {
            display += value;
            buttons.push(value);
          }
        }
        else {
          display += value;
          buttons.push(value);
        }
        break;
      case 'operations':
        const operations = this.calculatorValues.operations;
        if (operations.includes(lastButton)) {
          display = display.slice(0, -1) + value;
          buttons[buttons.length -1] = value;
        }
        else {
          display += value;
          buttons.push(value);
        }
        break;
      case 'equal':
        display = eval(display);
        buttons = [display];
        result = true;
        break;
      default:
        display = value;
        buttons = [value];
        break;
    }
    if (result === true && this.state.result === true) {
      result = false;
    }
    this.setState({display, buttons, result});
  }

  render() {
    let listItems = [];
    var calculatorValues = this.calculatorValues;

   for (let key in calculatorValues) {
    let items = calculatorValues[key].map(element => {return <Button value={element} type={key} handleClick={this.handleClick} > </Button>});
    listItems.push(
      <div className={key}>
        { items }
      </div>)
    }

    return (
      <div className="outer-calculator">
        <div className="calculator">
          <Display data={this.state.display} />
          <div className="buttons">
            { listItems }
          </div>
        </div>
      </div>
    );
  }

  calculatorValues = {
    'numbers': [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
    'operations': ['+', '-', '*', '/'],
    'clear': ['AC'],
    'equal': ['='],
  }
  
}

export default Calculator;
