import { connect } from 'react-redux'
import * as pageActions from '../redux/actions/page'
import Page from '../components/page'

function mapStateToProps(state) {
  const { displayedPokemons, isFetched, error, filters } = state.page

  return {
    displayedPokemons,
    isFetched,
    error,
    filters
  }
}

const mapDispatchToProps = {
  getPokemons: pageActions.getPokemons,
  filterPokemons: pageActions.filterPokemons,
  applyFilter: pageActions.applyFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
