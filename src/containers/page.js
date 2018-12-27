import { connect } from 'react-redux'
import * as pageActions from '../redux/actions/page'
import Page from '../components/page'

function mapStateToProps(state) {
  const {
    displayedPokemons,
    isFetched,
    error,
    pokemonType,
    pokemonTypes
  } = state.page

  return {
    displayedPokemons,
    isFetched,
    error,
    pokemonType,
    pokemonTypes
  }
}

const mapDispatchToProps = {
  getPokemons: pageActions.getPokemons,
  filterPokemons: pageActions.filterPokemons,
  applyTypeFilter: pageActions.applyTypeFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
