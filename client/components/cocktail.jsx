const React = require('react');

class Cocktail extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: props.name,
      numClicks: 0
    };
  }

  _handleClick () {
    const currentNumClicks = this.state.numClicks;
    this.setState('numClicks', currentNumClicks + 1);
  }

  _getNumClicks () {
    const numClicks = this.state.numClicks;
    return numClicks === 1 ?
      numClicks + ' time' :
      numClicks + ' times';
  }

  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <button onClick={this._handleClick.bind(this)}>
          I've been clicked {this._getNumClicks()} (and I don't work)
        </button>
      </div>
    );
  }

}

Cocktail.propTypes = {
  name: React.PropTypes.string
};

module.exports = Cocktail;
