import React from 'react';

import CocktailStore from '../stores/cocktail-store';

class Cocktails extends React.Component {

  constructor (props) {
    super(props);
    this.state = CocktailStore.getState();
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

export default Cocktails;
