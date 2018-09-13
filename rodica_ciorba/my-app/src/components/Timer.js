import React, { Component } from 'react';
import StartButton from './StartButton';
import StopButton from './StopButton';
import ResetButton from './ResetButton';
import ButtonsWrapper from './ButtonsWrapper';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
  }

  startTimer = () => {
    this.setState ({
      time: this.state.time,
      isOn: true,
      start: Date.now() - this.state.time
    });
    (this.state.time == 0) ?

      this.timer = setInterval(() => {
        this.setState({
          time: Date.now() - this.state.start
        })
      }, 1): null;
  };

  stopTimer = () => {
    this.setState({
      isOn: false
    });
    clearInterval(this.timer)
  };

  resetTimer = () => {
    this.setState({
      time: 0,
      isOn: false
    })
  };

  render() {
    return (
      <React.Fragment>
        <h3>Timer: {(this.state.time)}</h3>
        <ButtonsWrapper>
          <StartButton bg='green' onClick={this.startTimer}> Start </StartButton>
          <StopButton bg='red' onClick={this.stopTimer}> Stop </StopButton>
          <ResetButton bg='blue' onClick={this.resetTimer}> Reset </ResetButton>
        </ButtonsWrapper>
      </React.Fragment>
    )
  }
}
