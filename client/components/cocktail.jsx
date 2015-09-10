const React = require('react');

class Cocktail extends React.Component {

  render () {
    return <h1>{this.props.name}</h1>;
  }

}

Cocktail.propTypes = {
  name: React.PropTypes.string
};

module.exports = Cocktail;
