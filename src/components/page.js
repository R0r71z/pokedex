import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import Search from '../components/search'

class Page extends Component {
  constructor(props) {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getPokemons()
    this.setState({ ...this.props.filters })
  }

  handleSearch(event) {
    this.props.filterPokemons(event.currentTarget.value)
  }

  handleApplyFilter(event) {
    const [id, value] = [event.target.dataset.id, event.target.checked]
    const toState = {}
    toState[id] = value
    this.setState(toState)
    this.props.applyFilter(id, value)
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
          <Search onChange={this.handleSearch.bind(this)} />
        </div>

        <div className="page__filters">
          <span>Filter using Pokemon: </span>

          <label htmlFor="nameFilter" children="Name" />
          <input
            type="checkbox"
            data-id="nameFilter"
            checked={this.state.nameFilter}
            onChange={this.handleApplyFilter.bind(this)}
          />

          <label htmlFor="typeFilter" children="Type" />
          <input
            type="checkbox"
            data-id="typeFilter"
            checked={this.state.typeFilter}
            onChange={this.handleApplyFilter.bind(this)}
          />
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
