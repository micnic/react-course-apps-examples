import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './Calculator';

const root = document.getElementById('root');

class App extends React.Component {

  render() {
    return (
      <Calculator/>
    );
  }
}


// ========================================

ReactDOM.render(<App />, root);
