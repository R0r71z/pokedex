import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS,
  SET_FILTER
} from '../constants/page'

function setPokemons(pokemons) {
  return {
    type: SET_POKEMONS,
    payload: pokemons
  }
}

function getPokemonsInfo(data) {
  const pokemons = data.results.map(pokemon => {
    let { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)

    const request = async (url, pokemon) => {
      const response = await fetch(url)
      const json = await response.json()
      pokemon = Object.assign(pokemon, json)
    }

    request(url, pokemon)
    return pokemon
  })

  return pokemons
}

export function getPokemons() {
  return dispatch => {
    dispatch({
      type: GET_POKEMONS_REQUEST
    })

    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMONS_SUCCESS
        })
        dispatch(setPokemons(getPokemonsInfo(data)))
        dispatch(filterPokemons())
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMONS_FAIL,
          payload: error.message
        })
      })
  }
}

export function filterPokemons(searchString = '') {
  return (dispatch, getState) => {
    const { nameFilter, typeFilter } = getState().page.filters

    const displayedPokemons = getState().page.pokemons.filter(pokemon => {
      return (
        (nameFilter && pokemon.name.includes(searchString.toLowerCase())) ||
        (typeFilter &&
          pokemon.types &&
          pokemon.types.filter(tp => {
            return tp.type.name.includes(searchString.toLowerCase())
          }).length)
      )
    })

    dispatch({
      type: FILTER_POKEMONS,
      payload: displayedPokemons
    })
  }
}

export function applyFilter(filterType, value) {
  return (dispatch, getState) => {
    const filters = getState().page.filters
    filters[filterType] = value

    dispatch({
      type: SET_FILTER,
      payload: filters
    })
  }
}
