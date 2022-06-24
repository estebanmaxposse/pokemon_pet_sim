const GENDER_MALE = "male";
const GENDER_FEMALE = "female";

const POKEMON_METADATA = {
  "pichu": {
    "fullName": "Pichu",
    "image": "https://i.imgur.com/ROK2yzd.png",
    "sprites": {
      "idle": {
    		"url": 'https://i.imgur.com/Asn1lG5.png',
    		"count": 10,
    	},
      "eating": "",
    },
    "evolvesAt": 2,
    "evolvesInto": "pikachu",
  },
  "pikachu": {
    "fullName": "Pikachu",
    "image": "https://i.imgur.com/1L28AgF.png",
    "sprites": {
      "idle": {
        "url": 'https://i.imgur.com/OKczAEr.png',
        "count": 10,
      },
    },
    "evolvesAt": 3,
    "evolvesInto": "raichu",
  },
  "raichu": {
    "fullName": "Raichu",
    "image": "https://i.imgur.com/2cvLLi2.png",
    "sprites": {
      "idle": {
        "url": 'https://i.imgur.com/L0pfT9s.png',
        "count": 10,
      },
    },
    "evolvesAt": null,
    "evolvesInto": null,
  },
}

//sprite data & animations
const POKEMON_PIXELS = {}
Object.keys(POKEMON_METADATA).forEach(p => {
  const sprites = POKEMON_METADATA[p].sprites ?? {};
  const pixels = {};

  Object.keys(sprites).forEach(s => {
    const spriteData = {...sprites[s], direction: 'x'};
    pixels[s] = new FatPixels({
      scale  : 4.0,
    	speed  : "10fps",
    	sprite : spriteData,
    });
  });

  POKEMON_PIXELS[p] = pixels;
});

const pichuIdleData = POKEMON_METADATA['pichu'].sprites.idle;
const pichuIdle = new FatPixels({
  scale  : 4.0,
	speed  : "10fps",
	sprite : {...pichuIdleData, direction: 'x'},
});

const pikachuIdleData = POKEMON_METADATA['pikachu'].sprites.idle;
const pikachuIdle = new FatPixels({
  scale  : 4.0,
	speed  : "10fps",
	sprite : {...pikachuIdleData, direction: 'x'},
});

const raichuIdleData = POKEMON_METADATA['raichu'].sprites.idle;
const raichuIdle = new FatPixels({
  scale  : 4.0,
	speed  : "10fps",
	sprite : {...pichuIdleData, direction: 'x'},
});

class Pokemon {
  constructor(species, gender, sprite) {
    this.species = species;
    this.customName = species;
    this.gender = gender;
    this.sprite = sprite;
    this.exp = 0;
    this.lv = 1;
    this.hunger = getRandomInt();
    this.rest = getRandomInt();
    this.fun = getRandomInt();
    this.happiness = (this.hunger + this.rest + this.fun)/3;
  }

  setOnLevelUpListener(listener) {
    this.onLevelUp = listener;
  }

  addExp() {
    this.exp += 15;

    if (this.exp >= 100) {
      this.lv += 1;
      this.exp = 0;
      if (this.onLevelUp) {
        this.onLevelUp(this);
      }
    }
  }

  updateHappiness() {
    this.happiness = this.rest + this.fun + this.happiness;
    this.happiness /= 3;

    if (this.happiness >= 45) {
      this.addExp();
    }
  }

  addHunger(value) {
    this.hunger += value;
    if (this.hunger < 0) {
      this.hunger = 0;
    }
    else if (this.hunger > 100) {
      this.hunger = 100;
    }
    this.updateHappiness();
  }

  addRest(value) {
    this.rest += value;
    if (this.rest < 0) {
      this.rest = 0;
    }
    else if (this.rest > 100) {
      this.rest = 100;
    }
    this.updateHappiness();
  }

  addFun(value) {
    this.fun += value;
    if (this.fun < 0) {
      this.fun = 0;
    }
    else if (this.fun > 100) {
      this.fun = 100;
    }
    this.updateHappiness();
  }

  getGender() {
    if (this.gender === GENDER_MALE) {
      return "male";
    }
    else if (this.gender === GENDER_FEMALE) {
      return "female";
    }
    return "unknown";
  }

  pokemonPronoun() {
    if (this.gender == "male") {
      return "His";
    }
    else if (this.gender == "female") {
      return "Her";
    }
    else {
      return "Their";
    }
  }

  //once I know how to get sprites from APIs I'll finish this function
  getSprite() {
    if (this.species === "pichu") {
      return "https://i.imgur.com/ROK2yzd.png";
    }
  }
}

const pokemon1 = new Pokemon("pichu", GENDER_MALE, "no_sprite_yet", 0, 1, getRandomInt(), getRandomInt(), getRandomInt());

//Evolution data
function getEvolutionData(pokemonName) {
  const pokemonKey = Object.keys(POKEMON_METADATA).find(k => pokemonName === k);
  const pokemonData = POKEMON_METADATA[pokemonName];

  const evolution = pokemonData.evolvesInto;
  if (evolution) {
    const ret = POKEMON_METADATA[evolution];
    ret['species'] = evolution;
    return ret;
  }
  return null;
}

function getEvolutionLV(pokemonName) {
  const pokemonKey = Object.keys(POKEMON_METADATA).find(k => pokemonName === k);
  const pokemonData = POKEMON_METADATA[pokemonName];

  const pokemonEvolveLV = pokemonData.evolvesAt;
  if (pokemonEvolveLV) {
    return POKEMON_METADATA[pokemonEvolveLV];
  }
  return null;
}

function getPokemonImage(pokemonName) {
  // TODO check; refactor
  const pokemonKey = Object.keys(POKEMON_METADATA).find(k => pokemonName === k);

  const pokemonData = POKEMON_METADATA[pokemonName];

  return pokemonData.sprites;
}

//RNG
function getRandomInt(min=0, max=100) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Days
class Day {
  constructor(number, x) {
    this.number = parseInt(number);
    this.event = events[parseInt(x)];
  }
}

// Sound effects
const buttonFX = new Audio("emerald_0005.wav");
const audibleButton = document.querySelectorAll("button");
const musicToggle = document.getElementById('music-toggle');
const mainBG = new Audio("bg-theme_mixdown.mp3");
const pichuCry = new Audio("172.wav");
const pikachuCry = new Audio("025.wav");
const raichuCry = new Audio("026.wav");
const statUpFX = new Audio("stats_up.mp3");
const statDownFX = new Audio("stats_down.mp3");

audibleButton.forEach(button => {
  button.addEventListener("click", () => {
    buttonFX.play();
  });
});

musicToggle.onclick = () => {
  if (mainBG.paused) {
    mainBG.play();
  } else {
    music_stop();
  }
}

function music_stop() {
  mainBG.pause();
  mainBG.currentTime = 0;
}

const evolutionSFX = new Audio("31 Fanfare- Evolution.mp3");
const levelUpSFX = new Audio("Pokémon Level Up Sound Effect.mp3");

function playSFX(SFXtype) {
  if (SFXtype === "evolution") {
    evolutionSFX.play();
  }
  else if (SFXtype === "lvUp") {
    levelUpSFX.play();
  }
}

function playCry() {
  switch (pokemon1.species) {
    case "pichu":
      pichuCry.play();
      break;
    case "pikachu":
      pikachuCry.play();
      break;
    case "raichu":
      raichuCry.play();
      break;
    default:
      pichuCry.play();
      break;
  }
}

function playStatFX(stat) {
  if (stat === "up") {
    statUpFX.play();
  }
  else if (stat === "down") {
    statDownFX.play();
  }
}

//Notification Modals
const notificationModalTitle = document.getElementById('modal-notification-title');
const notificationModalBody = document.getElementById('modal-notification-body');

function showEvolutionModal(pkmn) {
  notificationModalTitle.innerText = "Congratulations!";
  notificationModalBody.innerText = `${pkmn.customName} evolved into ${getEvolutionData(pkmn.species).fullName}!`;
  $('#modal-notification').modal('show');

  playSFX("evolution");
}

function showLevelUpModal(pkmn) {
  notificationModalTitle.innerText = "Congratulations!";
  notificationModalBody.innerText = `${pkmn.customName} is now level ${pkmn.lv}!`;
  $('#modal-notification').modal('show');

  playSFX("lvUp");
}

//API handler
async function getPokeapi(pkmn) {
  const urlGet = `https://pokeapi.co/api/v2/pokemon/${pkmn}/`;
  const result = await fetch(urlGet);
  const pokeData = await result.json();
  return pokeData;
}

async function fetchPkmn(pkmn) {
  await getPokeapi(pkmn);
}

async function rewritePkmnData(pkmn) { // TODO check
  const pkmnData = await getPokeapi(pkmn);
  POKEMON_METADATA[`${pkmn}`]["id"] = pkmnData.id;
  POKEMON_METADATA[`${pkmn}`]["height"] = pkmnData.height;
  POKEMON_METADATA[`${pkmn}`]["weight"] = pkmnData.weight;
  POKEMON_METADATA[`${pkmn}`]["type"] = pkmnData.types[0].type.name;
  POKEMON_METADATA[`${pkmn}`]["sprites"]["front"] = {
    url: pkmnData.sprites.front_default
  };
  POKEMON_METADATA[`${pkmn}`]["sprites"]["back"] = {url: pkmnData.sprites.back_default};
  POKEMON_METADATA[`${pkmn}`]["sprites"]["officialArtwork"] = {url: pkmnData.sprites.other['official-artwork'].front_default};
  POKEMON_METADATA[`${pkmn}`]["stats"] = {
    hp: pkmnData.stats[0].base_stat,
    attack: pkmnData.stats[1].base_stat,
    defense: pkmnData.stats[2].base_stat,
    specialAttack: pkmnData.stats[3].base_stat,
    specialDefense: pkmnData.stats[4].base_stat,
    speed: pkmnData.stats[5].base_stat,
  };
}

// Gauge handler
const funGauge = document.getElementById(`fun-gauge`);
const funValue = funGauge.getAttribute(`value`);

const foodGauge = document.getElementById(`food-gauge`);
const foodValue = foodGauge.getAttribute(`value`);

const restGauge = document.getElementById(`rest-gauge`);
const restValue = restGauge.getAttribute(`value`);

const happinessGauge = document.getElementById(`happiness-gauge`);
const happinessValue = happinessGauge.getAttribute(`value`);

function getStats() {
  funGauge.setAttribute("value", pokemon1.fun);
  foodGauge.setAttribute("value", pokemon1.hunger);
  restGauge.setAttribute("value", pokemon1.rest);
  happinessGauge.setAttribute("value", pokemon1.happiness);
}

//buttons
function progressGauge(buttonType) {
  if (buttonType == "play") {
    pokemon1.addFun(30);
    pokemon1.addRest(-20);
    getStats();
    playStatFX("up");
  }
  else if (buttonType == "feed") {
    pokemon1.addHunger(40);
    pokemon1.addRest(-10);
    getStats();
    playStatFX("up");
  }
  else if (buttonType == "rest") {
    pokemon1.addRest(70);
    newDay();
    playStatFX("down");
  }
  happinessGauge.setAttribute("value", pokemon1.happiness);

  //pokemon levels up and/or evolves
  [pokemon1].forEach((pkmn, pkmnIndex) => {
    pkmn.setOnLevelUpListener(showLevelUpModal);
    const pokemonData = POKEMON_METADATA[pkmn.species];
    if (pokemonData.evolvesAt && pkmn.lv >= pokemonData.evolvesAt) {
      const evolutionData = getEvolutionData(pkmn.species);
      showEvolutionModal(pkmn);
      loadPokemonSprite(evolutionData.species, "idle");
      pkmn.species = pokemonData.evolvesInto;
      tooltip.title = `${pkmn.species}'s stats!`;
      tooltipTriggerList = new bootstrap.Tooltip(tooltip)
    }
  })
}

//reset button
function rerollStats() {
  let storedPokemon = JSON.parse(localStorage.getItem('storePokemon'));

  rolledStats = {
    ...storedPokemon,
    hunger: getRandomInt(),
    rest: getRandomInt(),
    fun: getRandomInt(),
  }

  let storePokemon = JSON.stringify(rolledStats);
  localStorage.setItem("storePokemon", storePokemon);
  location.reload();
}

function resetCache() {
  localStorage.clear();
  location.reload();
}

//Game intro
const introModal = document.getElementById('intro-msg-1');

const playerData = JSON.parse(localStorage.getItem('playerData'));

//store pokemon stats
function storeStats() {
  let storePokemon = JSON.stringify(pokemon1);
  localStorage.setItem("storePokemon", storePokemon);
}

function loadStatsCache() {
  let storedPokemon = JSON.parse(localStorage.getItem('storePokemon'));
  if (!storedPokemon) {
    return null;
  }
  pokemon1.species = storedPokemon.species;
  pokemon1.exp = storedPokemon.exp;
  pokemon1.lv = storedPokemon.lv;
  pokemon1.hunger = storedPokemon.hunger;
  pokemon1.rest = storedPokemon.rest;
  pokemon1.fun = storedPokemon.fun;
  pokemon1.happiness = storedPokemon.happiness;
}

//retrieve player's and pokemon's names
let playerName = "Player";
pokemon1.customName = "Pichu";
if (playerData != null) {
  playerName = playerData.name;
  pokemon1.customName = playerData.pokemonName;
}

function loadPokemonSprite(pkmnSpecies, state) {
  const canvas = document.getElementsByTagName('canvas');
  canvas[0].remove();

  const pokemonSprite = document.getElementById('pokemon-image-0');
  const newSprite = POKEMON_PIXELS[pkmnSpecies][state];
  newSprite.drawWithTarget(pokemonSprite);
}

function firstSprite(pkmnSpecies, state) { // Maybe should receive pikmin species
  const pokemonSprite = document.getElementById('pokemon-image-0');
  const newSprite = POKEMON_PIXELS[pkmnSpecies.species][state];
  newSprite.drawWithTarget(pokemonSprite);
}

// Pokémon Info Modal
const pokeInfoModalTitle = document.getElementById('modal-poke-info-title');
const pokeInfoModalBody = document.getElementById('modal-poke-info-body');

function pokeInfoModal() {
  updatePokeInfoModal();
  $('#modal-poke-info').modal('show');
  pokeInfoModalTitle.innerText = `${pokemon1.customName}`;
}

const pokeInfoSpecies = document.getElementById('stat-species');
const pokeInfoHeight = document.getElementById('stat-height');
const pokeInfoWeight = document.getElementById('stat-weight');
const pokeInfoId = document.getElementById('stat-id');
const pokeFightingStats = document.getElementById('pokemon-fighting-stats');
const pokeInfoImg = document.getElementById('loading-sprite-gif');
const listPlaceholder = document.getElementById('list-placeholder');

const updatePokeInfoModal = async() => { // TODO check
  await rewritePkmnData(pokemon1.species);
  pokeInfoSpecies.innerText = `${pokemon1.species}`;
  pokeInfoImg.src = POKEMON_METADATA[`${pokemon1.species}`].sprites.front.url;
  pokeInfoHeight.innerText = `${POKEMON_METADATA[`${pokemon1.species}`].height/10}m.`;
  pokeInfoWeight.innerText = `${POKEMON_METADATA[`${pokemon1.species}`].weight*10}g.`;
  pokeInfoId.innerText = `${POKEMON_METADATA[`${pokemon1.species}`].id}`;
  let pkmnFightingStats = POKEMON_METADATA[`${pokemon1.species}`]["stats"];
  pokeFightingStats.innerHTML = '';
  for (const [key, value] of Object.entries(pkmnFightingStats)){ // TODO check
    const statList = document.createElement('li');
    statList.classList.add('stat');
    let pokeInnerHTML = `
      <li>
       <span class="stat-name">${[key]}:</span>
       <span class="stat-value">${[value]}</span>
      </li>
    `;
    statList.innerHTML = pokeInnerHTML;
    pokeFightingStats.innerHTML += statList.innerHTML;
  }
}

function changeSprite() { // TODO check
  if (pokeInfoImg.src == POKEMON_METADATA[`${pokemon1.species}`].sprites.front.url) {
    pokeInfoImg.src = POKEMON_METADATA[`${pokemon1.species}`].sprites.back.url
  }
  else {
    pokeInfoImg.src = POKEMON_METADATA[`${pokemon1.species}`].sprites.front.url;
  }
}

//Official Artwork Modals
const officialArtworkElement = document.getElementsByClassName('official-artwork')[0]; // TODO check

function showArtworkModal() {
  officialArtworkElement.src = POKEMON_METADATA[`${pokemon1.species}`].sprites.officialArtwork.url;
  $('#modal-artwork').modal('show');
}

//Tooltip handler
const tooltip = document.getElementById('pokemon-image-0');
tooltip.title = `${pokemon1.species}'s stats!`;

//Day to day events
const events = [
  "Apparently today there's gonna be some crazy discounts at the PokeShop in town!",
  "Brrr... The weather suddenly got really cold. Better pack a jacket!",
  "It seems something is happening in the forest nearby. Maybe you should check it out!",
  "Wear some sunscreen today because it's gonna be really hot!",
  "There's a special discount today at the PokePark if you bring along your Pokémon! You should check it out!",
  "A mysterious Pokémon has apparently been sighted near the beach! You should be careful if you plan on going there!",
  "A new festival is in town! Wanna go check it out?",
  "It's Chesto Berry season! They're {pokemon1.customName}'s favorite! You should go grab some!" // TODO .replace
];

//About & FAQs Modals
function showAboutModal() {
  $('#modal-about').modal('show');
}

function showFAQsModal() {
  $('#modal-faq').modal('show');
}

//Intro loader
$(window).on('load',function() { // TODO check
  $('#modal-notification').modal('hide');
  $('#modal-faq').modal('hide');
  $('#modal-artwork').modal('hide');
  $('#modal-about').modal('hide');

  //If there's data don't replay intro
  if (!playerData) {
    $('#intro-msg-1').modal('show');
  }

  //Loads pokemon sprite
  firstSprite(pokemon1, "idle");

  //Loads pokemon data
  loadStatsCache();
  loadPokemonSprite(pokemon1.species, "idle");

  //replace text in day to day events
  let eventsText = events[7].replace("{pokemon1.customName}", pokemon1.customName);

  tooltip.title = `${pokemon1.species}'s stats!`;
  tooltipTriggerList = new bootstrap.Tooltip(tooltip);

  //gets stats from cache
  getStats();
});

// Intro's handler
const introMessages = [
  ["???", "Hello there! Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof!"],
  ["Prof. Oak", "This world is inhabited by creatures called Pokémon! For some people, Pokémon are pets. Other use them for fights. Myself… I study Pokémon as a profession."],
  ["Prof. Oak", "So, what is your name?"],
  ["Prof. Oak", `Right! So your name is {playerName}!`],
  ["Prof. Oak", `First, let me introduce you to your very own Pokémon: ${pokemon1.species}! This little boy is an electric type Pokémon. ${pokemon1.species}s are often social Pokémons known for their playful and mischievous demeanor.`],
  ["Prof. Oak", `What will be ${pokemon1.species}'s name?`],
  ["Prof. Oak", `So ${pokemon1.pokemonPronoun()} name is {pokemon1.customName}!`],
  ["Prof. Oak", `{playerName}! {pokemon1.customName}! Your very own Pokémon legend is about to unfold! A world of dreams and adventures with Pokémon awaits! Let's go!`],
]

let msgIndex = 1;
function continueIntro() {
  if (msgIndex >= 8) {
    $('#intro-msg-1').modal('hide');
    // set
    localStorage.setItem("playerData", JSON.stringify({'name': playerName, 'pokemonName': pokemon1.customName}))
    return;
  }

  // Read user's input
  if (msgIndex === 3 || msgIndex === 6) {
    const nameInput = document.getElementById('player-name');
    let name = nameInput.value;
    if (msgIndex === 3) {
      playerName = name || "Player";
    }
    else {
      pokemon1.customName = name || "Pichu";
      storeStats();
      let eventsText = events[7].replace("{pokemon1.customName}", pokemon1.customName);
    }
    nameInput.value = "";
  }

  const [title, text] = introMessages[msgIndex];

  // TODO check
  let introText = text.replace("{playerName}", playerName).replace("{pokemon1.customName}", pokemon1.customName);

  const introNewModalTitle = document.getElementById('intro-msg-1-toggle');
  const introModalText = document.getElementById('intro-modal-text');

  introNewModalTitle.innerText = title;
  introModalText.innerText = introText;

  // Allow user to write input
  document.getElementById('player-name-input').style.display = (msgIndex === 2 || msgIndex === 5) ? "block" : "none";

  msgIndex++;
}

// Handles day to day events
function showNotif(type) {
  $(`#notification-${type}`).toast('show');
  $(`#notification-${type}-title`).text(`${pokemon1.customName} is ${type}!`);
}

let dayCounter = 1;

function newDay() {
  pokemon1.addHunger(-30);
  pokemon1.addFun(-20);
  storeStats();

  dayCounter++;
  $('#daily-number').text(`Day ${dayCounter}`);
  $('#daily-event').text(events[getRandomInt(0, events.length - 1)]);
  $('#daily-modal').modal('show');

  pokemon1.hunger < 50 && showNotif("hungry"); // TODO check
  pokemon1.rest < 50 && showNotif("tired");
  pokemon1.fun < 50 && showNotif("bored");

  getStats();
}
