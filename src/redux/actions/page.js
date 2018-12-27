import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  SET_TYPES,
  FILTER_POKEMONS,
  SET_TYPE_FILTER
} from '../constants/page'

function setPokemons(data) {
  const completeInfo = async (url, pok) => {
    const data = await fetch(url)
    const json = await data.json()
    Object.assign(pok, json)
  }

  const pokemons = data.results.map(pokemon => {
    let { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)
    completeInfo(url, pokemon)
    return pokemon
  })

  return {
    type: SET_POKEMONS,
    payload: pokemons
  }
}

function setTypes(data) {
  const pokemonTypes = data.results.map(type => type.name)

  return {
    type: SET_TYPES,
    payload: pokemonTypes
  }
}

export function getPokemons() {
  return dispatch => {
    dispatch({
      type: GET_POKEMONS_REQUEST
    })

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`)
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
        dispatch(setPokemons(data))
        dispatch(filterPokemons())
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMONS_FAIL,
          payload: error.message
        })
      })

    return fetch('https://pokeapi.co/api/v2/type/')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch(setTypes(data))
      })
  }
}

export function filterPokemons(searchString = '') {
  return (dispatch, getState) => {
    const typeFilterActive = getState().page.pokemonTypeFilter
    const pokemonType = getState().page.pokemonType
    const displayedPokemons = getState().page.pokemons.filter(pokemon => {
      return (
        (typeFilterActive &&
          pokemon.name.includes(searchString.toLowerCase()) &&
          pokemon.types &&
          pokemon.types.filter(tp => {
            return tp.type.name.includes(pokemonType.toLowerCase())
          }).length) ||
        (!typeFilterActive && pokemon.name.includes(searchString.toLowerCase()))
      )
    })

    dispatch({
      type: FILTER_POKEMONS,
      payload: displayedPokemons
    })
  }
}

export function applyTypeFilter(value = '', pokemonName = '') {
  return (dispatch, getState) => {
    dispatch({
      type: SET_TYPE_FILTER,
      payload: value
    })
    dispatch(filterPokemons(pokemonName))
  }
}
