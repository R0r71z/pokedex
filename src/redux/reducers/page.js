import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS,
  SET_TYPE_FILTER,
  SET_TYPES
} from '../constants/page'

const initialState = {
  isFetched: false,
  error: null,
  pokemons: [],
  displayedPokemons: [],
  pokemonTypeFilter: false,
  pokemonType: '',
  pokemonTypes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMONS_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }

    case FILTER_POKEMONS:
      return {
        ...state,
        displayedPokemons: action.payload
      }

    case SET_TYPE_FILTER:
      return {
        ...state,
        pokemonTypeFilter: !(action.payload.toLowerCase() === 'all'),
        pokemonType: action.payload
      }

    case SET_TYPES:
      return {
        ...state,
        pokemonTypes: action.payload
      }
    default:
      return state
  }
}
