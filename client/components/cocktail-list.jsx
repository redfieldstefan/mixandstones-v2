import React from 'react';

class Cocktails extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      cocktails: props.cocktails
    };
  }

  _getCocktailList () {
    return this.state.cocktails.map((cocktail) => {
      return (
        <li key={cocktail.id}>
          <a href={`cocktails/${cocktail.id}`}>{cocktail.name}</a>
        </li>
      );
    });
  }

  render () {
    return (
      <ul>
        {this._getCocktailList()}
      </ul>
    );
  }

}

Cocktails.propTypes = {
  cocktails: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    ingredients: React.PropTypes.array
  })).isRequired
};

export default Cocktails;
