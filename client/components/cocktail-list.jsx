import React from 'react';

import CocktailStore from '../stores/cocktail-store';

class Cocktails extends React.Component {

  constructor (props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this.state = CocktailStore.getState();
    this.state.unfilteredCocktails = this.state.cocktails;
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

  _handleChange (ev) {
    const value = ev.target.value.toLowerCase();
    const filteredCocktails = this.state.unfilteredCocktails.filter((cocktail) => {
      return cocktail.name.toLowerCase().indexOf(value) > -1;
    });
    this.setState({ cocktails: filteredCocktails });
  }

  render () {
    return (
      <div>
        <input onChange={this._handleChange} type="text" placeholder="search"/>
        <ul>
          {this._getCocktailList()}
        </ul>
      </div>
    );
  }

}

export default Cocktails;
