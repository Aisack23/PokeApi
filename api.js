const pokemonNameInput = document.getElementById('pokemonName');
const searchButton = document.getElementById('searchBtn');
const pokemonList = document.getElementById('pokeList');

function addPokemonToList(pokemon) {
    const li = document.createElement('li');
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    li.innerHTML = `
        <div>
            <img src="${pokemon.sprites.front_default}"">
        </div>
        <div>
            <h3>${pokemon.name} #${pokemon.id}</h3>
            <p>Type: ${types}</p>
        </div>
        <button class="remove-btn" onclick="removePokemon(this)">
            🗑️
        </button>`;
    pokeList.appendChild(li);
}

function removePokemon(button) {
    const li = button.parentElement;
    pokemonList.removeChild(li);
}

function searchPokemon() {
    const pokemonName = pokemonNameInput.value.toLowerCase().trim();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {
            addPokemonToList(data); 
            pokemonNameInput.value = '';  
        })
        .catch(error => {
            alert('Pokemon not found');
        });
}

searchButton.addEventListener('click', searchPokemon);

// También buscar al presionar Enter en el campo de búsqueda - con ayuda de Chat
pokemonNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});
