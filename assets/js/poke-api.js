/* saída será um objeto contendo funções de manipulação da poke-api */

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const base_stats = pokeDetail.stats.map((base_stat) => base_stat.base_stat)
    pokemon.base_stats = base_stats
    
    const statNames = pokeDetail.stats.map((baseStat) => baseStat.stat.name)
    pokemon.statNames = statNames

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then( (response) => response.json() )
        .then( (jsonBody) => jsonBody.results )
        .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then( (detailRequests) => Promise.all(detailRequests))
        .then( (pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`

    const response = await fetch(url)
    const pokemon  = await response.json()
    const pokemonObj = convertPokeApiDetailToPokemon(pokemon)
    console.log(pokemonObj)
    return pokemonObj
}


