import React from 'react';

class Cocktails extends React.Component {

  _addCocktails () {
    return this.props.data.map(function(cocktail){
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

Cocktail.propTypes = {
  name: React.PropTypes.string
};

export default Cocktails;
