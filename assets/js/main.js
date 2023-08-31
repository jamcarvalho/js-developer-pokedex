
const pokemonList = document.getElementById('pokemonList')
const nextPage = document.getElementById('NextPage')
const backPage = document.getElementById('BackPage')
const backPageDiv = document.getElementById('backPageDiv')
const nextPageDiv = document.getElementById('nextPageDiv')
const limit  = 10;
let   offset = 0;
const maxRecords = 151;

function loadPokemonItems(offset,limit) {

    pokeApi.getPokemons(offset,limit).then( (pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
            <a href="/pokemon.html?pokemonId=${pokemon.number}"
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            </a>    
        `).join('')
        pokemonList.innerHTML = newHTML
    })
}

function showButtons(backPage,NextPage) {

        backPageDiv.style.display = backPage
        nextPageDiv.style.display = NextPage
}

loadPokemonItems(offset,limit)

nextPage.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset,newLimit)
        showButtons('block','none')
    } else {
        loadPokemonItems(offset,limit)
        showButtons('block','block')
    }
})

backPage.addEventListener('click', () => {
    if (offset > 0) {
        offset -= limit
        loadPokemonItems(offset,limit)
        if (offset > 0) {
            showButtons('block','block')
        } else {
            showButtons('none','block')
        }
        
    }
})



