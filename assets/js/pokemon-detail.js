const pokemonItem = document.getElementById('pokemonItem')

function getUrlVars() {
    var vars = {}
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value
    })
    return vars
}

const pokemonId = getUrlVars()["pokemonId"]

function loadPokemon(pokemonId) {

    pokeApi.getPokemonById(pokemonId).then( (pokemonObj) => {
        const newHTML = `
        <div class="pokemon ${pokemonObj.type}">
            <img src="${pokemonObj.photo}" alt="${pokemonObj.name}">
            <span class="name">${pokemonObj.name}</span>
            <span class="number">#${pokemonObj.number}</span>
            <ol class="emLinhatypes">
                ${pokemonObj.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div>
            <ol class="stats">
                ${pokemonObj.statNames.map((statName) => `<li class="statLi">${statName}</li>`).join('')}
            </ol>
            <ol class="stats">
                ${pokemonObj.base_stats.map((base_stats) => `<li>${base_stats}</li>`).join('')}
            </ol>
            </div>
        </div>
            
        <div class="inferior">

        </div>`
        pokemonItem.innerHTML = newHTML                    
    })
}

loadPokemon(pokemonId)






