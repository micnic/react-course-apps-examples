import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';

class App extends Component {
  render() {

    return (
      <div className="container message-box">
        <div className="message-box__users border">
          <Sidebar />
        </div>
        <div className="message-box__message-list border">
          <MessagesList />
        </div>
        <div className="message-box__add-message border">
          <AddMessage />
        </div>
      </div>
    )
  }
}

export default App;
