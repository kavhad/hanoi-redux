import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from './common/header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
