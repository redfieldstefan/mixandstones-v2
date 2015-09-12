import React from 'react';
import { RouteHandler } from 'react-router';

/**
 * Wrapper component that simply passes through props to handler
 */

class App extends React.Component {

  render () {
    return (
      <RouteHandler {...this.props} />
    );
  }

}

export default App;
