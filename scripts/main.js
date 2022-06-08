const GENDER_MALE = "male";
const GENDER_FEMALE = "female";

const POKEMON_METADATA = {
  "pichu": {
    "fullName": "Pichu",
    "image": "https://i.imgur.com/ROK2yzd.png",
    "evolvesAt": 7,
    "evolvesInto": "pikachu",
  },
  "pikachu": {
    "fullName": "Pikachu",
    "image": "https://i.imgur.com/JNpCZiN.png",
    "evolvesAt": 16,
    "evolvesInto": "raichu",
  },
  "raichu": {
    "fullName": "Raichu",
    "image": "https://i.imgur.com/oNQZjIZ.png",
    "evolvesAt": null,
    "evolvesInto": null,
  },
}

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

//Evolution data
function getEvolutionData(pokemonName) {
  const pokemonKey = Object.keys(POKEMON_METADATA).find(k => pokemonName === k);
  const pokemonData = POKEMON_METADATA[pokemonName];

  const evolution = pokemonData.evolvesInto;
  if (evolution) {
    return POKEMON_METADATA[evolution];
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
  const pokemonKey = Object.keys(POKEMON_METADATA).find(k => pokemonName === k);
  const pokemonData = POKEMON_METADATA[pokemonName];

  return pokemonData.image;
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

audibleButton.forEach(button => {
  button.addEventListener("click", () => {
    buttonFX.play();
  });
});

const mainBG = new Audio("bg-theme_mixdown.mp3");
mainBG.loop = true;
function playOnBG() {
  mainBG.play();
}

const evolutionSFX = new Audio("31 Fanfare- Evolution.mp3");
const levelUpSFX = new Audio("Pokémon Level Up Sound Effect.mp3")

function playSFX(SFXtype) {
  (SFXtype === "evolution") && evolutionSFX.play();
  (SFXtype === "lvUp") && levelUpSFX.play();
}

//Notification Modals
let notificationModalTitle = document.getElementById('modal-notification-title');
let notificationModalBody = document.getElementById('modal-notification-body');

function evolutionModal(pkmn) {
  $('#modal-notification').modal('show');
  playSFX("evolution");
  notificationModalTitle.innerText = "Congratulations!";
  notificationModalBody.innerText = `${pkmn.customName} evolved into ${getEvolutionData(pkmn.species).fullName}!`;
}

function levelUpModal(pkmn) {
  $('#modal-notification').modal('show');
  playSFX("lvUp");
  notificationModalTitle.innerText = "Congratulations!";
  notificationModalBody.innerText = `${pkmn.customName} is now level ${pkmn.lv}!`;
}

// Gauge handler
var funGauge = document.getElementById(`fun-gauge`);
var funValue = funGauge.getAttribute(`value`);

var foodGauge = document.getElementById(`food-gauge`);
var foodValue = foodGauge.getAttribute(`value`);

var restGauge = document.getElementById(`rest-gauge`);
var restValue = restGauge.getAttribute(`value`);

var happinessGauge = document.getElementById(`happiness-gauge`);
var happinessValue = happinessGauge.getAttribute(`value`);

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
  }
  else if (buttonType == "feed") {
    pokemon1.addHunger(40);
    pokemon1.addRest(-10);
    getStats();
  }
  else if (buttonType == "rest") {
    pokemon1.addRest(70);
    newDay();
  }
  happinessGauge.setAttribute("value", pokemon1.happiness);

  //pokemon levels up and/or evolves
  [pokemon1].forEach((pkmn, pkmnIndex) => {
    pkmn.setOnLevelUpListener(levelUpModal);
    const pokemonData = POKEMON_METADATA[pkmn.species];
    if (pokemonData.evolvesAt && pkmn.lv >= pokemonData.evolvesAt) {
      const evolutionData = getEvolutionData(pkmn.species);
      evolutionModal(pkmn);
      const component = document.getElementById('pokemon-image-' + pkmnIndex);
      component.src = evolutionData.image;
      pkmn.species = pokemonData.evolvesInto
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
var introModal = document.getElementById('intro-msg-1');

var playerData = JSON.parse(localStorage.getItem('playerData'));

//store pokemon stats
const pokemon1 = new Pokemon("pichu", GENDER_MALE, "no_sprite_yet", 0, 1, getRandomInt(), getRandomInt(), getRandomInt());

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
var playerName = "Player";
pokemon1.customName = "Pichu";
if (playerData != null) {
  playerName = playerData.name;
  pokemon1.customName = playerData.pokemonName;
}

function loadPokemonSprite(pkmn) {
  let pokemonSprite = document.getElementById('pokemon-image-0');
  const newSprite = getPokemonImage(pkmn.species);
  pokemonSprite.src = newSprite;
}

$(window).on('load',function(){
  $('#modal-notification').modal('hide');
  if (!playerData) {
    $('#intro-msg-1').modal('show');
  }
  loadStatsCache();
  loadPokemonSprite(pokemon1);
  getStats();
  playOnBG();
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
    var nameInput = document.getElementById('player-name');
    var name = nameInput.value;
    if (msgIndex === 3) {
      playerName = name || "Player";
    }
    else {
      pokemon1.customName = name || "Pichu";
      storeStats();
    }
    nameInput.value = "";
  }

  const [title, text] = introMessages[msgIndex];

  var introText = text.replace("{playerName}", playerName)
                                            .replace("{pokemon1.customName}", pokemon1.customName);

  var introNewModalTitle = document.getElementById('intro-msg-1-toggle');
  var introModalText = document.getElementById('intro-modal-text');

  introNewModalTitle.innerText = title;
  introModalText.innerText = introText;

  // Allow user to write input
  (msgIndex === 2 || msgIndex === 5) ? document.getElementById('player-name-input').style.display = "block" : document.getElementById('player-name-input').style.display = "none";

  msgIndex++;
}

const events = [
  "Apparently today there's gonna be some crazy discounts at the PokeShop in town!",
  "Brrr... The weather suddenly got really cold. Better pack a jacket!",
  "It seems something is happening in the forest nearby. Maybe you should check it out!", "Wear some sunscreen today because it's gonna be really hot!",
  "There's a special discount today at the PokePark if you bring along your Pokémon! You should check it out!",
  "A mysterious Pokémon has apparently been sighted near the beach! You should be careful if you plan on going there!",
  "A new festival is in town! Wanna go check it out?",
  `It's Chesto Berry season! They're ${pokemon1.customName}'s favorite! You should go grab some!'`
];

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
  $('#daily-event').text(events[getRandomInt(0, 6)]);
  $('#daily-modal').modal('show');

  pokemon1.hunger < 50 && showNotif("hungry");
  pokemon1.rest < 50 && showNotif("tired");
  pokemon1.fun < 50 && showNotif("bored");

  getStats();
}
