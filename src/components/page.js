import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import Search from '../components/search'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.getPokemons()
    this.setState({
      pokemonType: this.props.pokemonType
    })
  }

  handleSearch(event) {
    this.setState({
      searchStr: event.currentTarget.value
    })

    this.props.filterPokemons(event.currentTarget.value)
  }

  handleChange(event) {
    this.setState({ pokemonType: event.target.value })
    this.props.applyTypeFilter(event.target.value, this.state.searchStr)
  }

  render() {
    let { displayedPokemons, isFetched, error } = this.props

    let pokemons = displayedPokemons.map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
        </li>
      )
    })

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <Search
            value={this.state.searchStr}
            onChange={this.handleSearch.bind(this)}
          />
          <br />
          <label htmlFor="typeFilter" children="Pokemon Type: " />
          <select
            value={this.state.pokemonType}
            id="typeFilter"
            onChange={this.handleChange.bind(this)}
          >
            <option>All</option>
            {this.props.pokemonTypes.map(type => {
              return <option key={type}>{type}</option>
            })}
          </select>
        </div>
        {isFetched ? (
          <p>Loading...</p>
        ) : (
          <ul className="pokemons">{pokemons}</ul>
        )}
      </div>
    )
  }
}

export default Page
