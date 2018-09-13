import React, { Component } from 'react';

const operations = {
  '/': (prevNumber, nextNumber) => prevNumber / nextNumber,
  '*': (prevNumber, nextNumber) => prevNumber * nextNumber,
  '+': (prevNumber, nextNumber) => prevNumber + nextNumber,
  '-': (prevNumber, nextNumber) => prevNumber - nextNumber,
  '%': (prevNumber, nextNumber) => prevNumber % nextNumber
};

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const formatResult= (value) => {
  return Number.isNaN(value) ? "Not a number" : String(value);
}

class TableCell extends Component {
  constructor(props) {
    super(props);

    this.inputRef = this.props.inputRef;
    this.useOperation = this.props.useOperation;
    this.operation = this.props.operation;
  }

  handleClick = (e) => {
    const value = this.props.operation || e.target.innerText;
    this.props.useOperation(value);
  }

  render() {
    const { colSpan, children, modifier } = this.props;
    // const op = operation ? operation : children;
    let modifierClass = modifier ? ' calculator__cell--' + modifier : '';
    modifierClass = colSpan ? modifierClass + ' calculator__cell--' + colSpan : modifierClass; 

    
    return (
      <div className={`calculator__cell${modifierClass}`} onClick={this.handleClick} onFocus={this.handleClick} colSpan={colSpan}>{children}</div>
    )
  }
}

export default class Calculator extends Component {

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      displayValue: '0',
      prevNumber: null,
      currentNumber: null,
      memoryOperand: null,
      operation: ''
    }
  }

  operate = (key) => {
    const { currentNumber, prevNumber, operation, displayValue, memoryOperand } = this.state;

    let newDisplayValue = displayValue;
    let newCurrentNumber = currentNumber;
    let newOperation = operation;
    let newPrevNumber = prevNumber;
    let newMemoryOperand = memoryOperand;

    if (key === "Backspace" || key === "Delete") {
      newCurrentNumber = parseFloat(String(currentNumber).slice(0, -1)) || 0;
      newDisplayValue = newCurrentNumber;
    }

    else if (/\d/.test(key)) {
      if (isNumeric(currentNumber)) {
        newCurrentNumber = parseFloat(displayValue + key);
      }
      else {
        newCurrentNumber = parseFloat(key);
      }
      newDisplayValue = String(newCurrentNumber);
    }

    else if (key === ',' || key === '.') {
      if (isNumeric(currentNumber)) {
        newDisplayValue = displayValue + '.';
      }
    }

    else if (operations[key]) {
      newOperation = key;
      newCurrentNumber = '';

      if (isNumeric(currentNumber)) {
        newPrevNumber = currentNumber;

        if (isNumeric(prevNumber)) {
          newCurrentNumber = operations[operation](prevNumber, currentNumber);
          newDisplayValue = formatResult(newCurrentNumber);
          newPrevNumber = null;
        }
      }
    }

    else if (key === "Enter" || key === "=") {
      if (operation) {

        if (isNumeric(currentNumber) && isNumeric(memoryOperand)) {
          newCurrentNumber = operations[operation](currentNumber, memoryOperand);
        }

        if (isNumeric(currentNumber) && isNumeric(prevNumber)) {
          newCurrentNumber = operations[operation](prevNumber, currentNumber);
          newMemoryOperand = currentNumber;
          newPrevNumber = null;
        }
        
        newDisplayValue = formatResult(newCurrentNumber);
      }
    }

    else if (key === "sign") {
      if (isNumeric(currentNumber)) {
        newCurrentNumber = currentNumber * -1;
        newDisplayValue = String(newCurrentNumber);
      }
    }

    else if (key === "all-clear") { 
      newDisplayValue = '0';
      newPrevNumber = null;
      newCurrentNumber = null;
      newMemoryOperand = null;
      newOperation = '';
    }

    else if (key === "entry-clear") { 
      newDisplayValue = '0';
      newCurrentNumber = null;
    }

    this.setState({
      prevNumber: newPrevNumber,
      operation: newOperation,
      currentNumber: newCurrentNumber,
      displayValue: newDisplayValue,
      memoryOperand: newMemoryOperand
    })
  }

  onKeyUp = (e) => {
    this.operate(e.key);
  }

  useOperation = (e) => {
    this.operate(e)
  }

  focusTheInput = () => {
    this.inputRef.current.focus();
  }

  componentDidMount() {
    this.focusTheInput();
    window.addEventListener('keydown', this.onKeyUp)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyUp)
  }

  render() {
    const { displayValue } = this.state;

    const defaultProps = {
      useOperation: this.useOperation, 
      inputRef: this.inputRef,
    };

    let clearText = 'AC'
    let clearOperation = 'all-clear'

    if (displayValue !== '0') {
      clearText = 'C';
      clearOperation = 'entry-clear';
    }

    return (
      <React.Fragment>

        <div className="calculator">
          <input className="calculator__input" type="text" value={displayValue} readOnly onChange={this.onChange} ref={this.inputRef} onBlur={this.focusTheInput} />

          <TableCell {...defaultProps} operation={clearOperation} modifier="strong">{clearText}</TableCell>
          <TableCell {...defaultProps} operation="sign" modifier="strong">+/-</TableCell>
          <TableCell {...defaultProps} operation="%" modifier="strong">%</TableCell>
          <TableCell {...defaultProps} operation="/" modifier="operation">/</TableCell>
        
          <TableCell {...defaultProps}>7</TableCell>
          <TableCell {...defaultProps}>8</TableCell>
          <TableCell {...defaultProps}>9</TableCell>
          <TableCell {...defaultProps} operation="*" modifier="operation">*</TableCell>
        
          <TableCell {...defaultProps}>4</TableCell>
          <TableCell {...defaultProps}>5</TableCell>
          <TableCell {...defaultProps}>6</TableCell>
          <TableCell {...defaultProps} operation="-" modifier="operation">-</TableCell>
        
          <TableCell {...defaultProps}>1</TableCell>
          <TableCell {...defaultProps}>2</TableCell>
          <TableCell {...defaultProps}>3</TableCell>
          <TableCell {...defaultProps} operation="+" modifier="operation">+</TableCell>
        
          <TableCell {...defaultProps} colSpan="2">0</TableCell>
          <TableCell {...defaultProps}>.</TableCell>
          <TableCell {...defaultProps} operation="=" modifier="operation">=</TableCell>
        </div>
      </React.Fragment>
    )
  }
}
