let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokeContainer = document.getElementById("pokemon");
const errormsg = document.getElementById("error");
let pokemon;
let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let types = document.getElementById("types");
let image = document.getElementById("pok-img");

// Pokemon Stats
let hp = document.getElementById("hp");
let att = document.getElementById("attack");
let def = document.getElementById("defense");
let spAtt = document.getElementById("special-attack");
let spDef = document.getElementById("special-defense");
let speed = document.getElementById("speed");

button.addEventListener('click', fetchData);

async function fetchData(e) {
    e.preventDefault();
    pokemon = input.value.toLowerCase();
    if (!pokemon) {
        clear();
        errorHandle("Please enter a pokemon's name", 1500);
        return;
    }
    try {
        const response = await fetch(url + pokemon);
        const pokemonData = await response.json();
        pokeContainer.style.height = '50vh';
        pokemonName.innerText = pokemonData.name.toUpperCase();
        pokemonId.innerText = `#${pokemonData.id}`;
        weight.innerText = `Weight: ${pokemonData.weight}`;
        height.innerText = `Height: ${pokemonData.height}`;
        types.innerHTML = pokemonData.types.map(type => `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join(' ');
        image.src = pokemonData.sprites.front_default;
        hp.innerText = pokemonData.stats[0].base_stat;
        att.innerText = pokemonData.stats[1].base_stat;
        def.innerText = pokemonData.stats[2].base_stat;
        spAtt.innerText = pokemonData.stats[3].base_stat;
        spDef.innerText = pokemonData.stats[4].base_stat;
        speed.innerText = pokemonData.stats[5].base_stat;
    } catch (error) {
        clear();
        errorHandle("No Pokemon found. Make sure to spell the pokemon's name correctly.", 2000);
    }
}

function errorHandle(msg, duration) {
    errormsg.innerText = msg;
    errormsg.style.opacity = 1;
    errormsg.style.height = '13vh';
    setTimeout(() => {
        errormsg.innerText = "";
        errormsg.style.opacity = 0;
        errormsg.style.height = 0;
    }, duration);
}

function clear() {
    pokeContainer.style.height = '18vh';
    pokemonName.innerText = '';
    pokemonId.innerText = '';
    weight.innerText = '';
    height.innerText = '';
    types.innerHTML = '';
    image.src = '';
    input.value = '';
    hp.innerText = 0;
    att.innerText = 0;
    def.innerText = 0;
    spAtt.innerText = 0;
    spDef.innerText = 0;
    speed.innerText = 0;
}