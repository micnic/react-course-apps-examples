import React, { Component } from 'react';

export default class Timer extends Component {

  constructor (props) {
    super(props)

    this.state = { 
      time: 0,
      started: false
    }
    this.interval = null;
  }


  setTimer(counter) {
    this.setState({
      time: counter,
    })
  }

  render () {
    return (
      <div>
        <Display onChangeChild={this.onInputChange.bind(this)} time={this.state.time}/>
        <Button action={this.onCountDown.bind(this)}>CountDown</Button>
        <Button action={this.onTimer.bind(this)}>Start Timer</Button>
        <Button action={this.onReset.bind(this)}>Reset</Button>
        <Button action={this.onStop.bind(this)}>Stop</Button>
      </div>
    )
  }

  start() {
    this.setState({
      started: true
    })
  }

  stop() {
    clearInterval(this.interval)
    this.setState({
      started: false
    })
  }

  onCountDown = () => {
    if (this.state.started) {
      return;
    }

    let counter = this.state.time
    
    if (counter > 0) {
      this.interval = setInterval(() => {
        if (counter <= 0) {
          this.stop()
          return
        }
        this.setTimer(--counter);
      }, 1000);

      this.start()
    }
  }

  onTimer = () => {
    if (this.state.started) {
      return;
    }

    let counter = this.state.time
    
    this.interval = setInterval(() => {
      this.setTimer(counter++);
    }, 1000);

    this.start()
  }

  onStop = () => {
    if (!this.state.started) {
      return
    }

    this.stop()
  }

  onReset() {
    this.stop();
    this.setTimer(0);
  }

  onInputChange(e) {
    this.setState({
      time: e.target.value
    });
  }

}

class Display extends React.Component {
  render () {
    return (
      <div className="display">
        <input type="number" value={this.props.time} onChange={this.props.onChangeChild} onFocus={this.onFocus}/>
      </div>
    )
  }

  onFocus(e) {
    if (e.target.value == 0) {
      e.target.value = ''
    }
  }
}

class Button extends React.Component {
    render () {
      return <div className="buttons">
        <button onClick={this.props.action} style={{width: '200px'}}>{this.props.children}</button>
      </div>
    }
}

