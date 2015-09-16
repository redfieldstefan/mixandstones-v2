import React from 'react';

class Cocktails extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      list: props,
    };
  }

  _addCocktails () {
    return this.props.cocktails.map(function (cocktail) {
        return <li>{cocktail.name}</li>
    });
  }

  render () {
    return (
      <ul>
        {this._addCocktails()}
      </ul>
    );
  }

}

Cocktails.propTypes = {
  name: React.PropTypes.string
};

export default Cocktails;
