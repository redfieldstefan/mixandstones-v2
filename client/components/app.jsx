import React from 'react';
import { RouteHandler } from 'react-router';

/**
 * Wrapper route that simply passes through props to real handler
 */

class App extends React.Component {

  render () {
    return (
      <RouteHandler {...this.props}/>
    );
  }

}

export default App;
