const GENDER_MALE = "male";
const GENDER_FEMALE = "female";

function getRandomInt(min, max) {
  min = Math.ceil(0);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Pokemon object to be implemented at a later date, this is a mockup of how the Pokemon object would work
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

  addExp() {
    this.exp += 15;

    if (this.exp >= 100) {
      this.lv += 1;
      this.exp = 0;
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
      return "male"
    }
    else if (this.gender === GENDER_FEMALE) {
      return "female"
    }
    return "unknown"
  }

  pokemonPronoun() {
    if (this.gender == "male") {
      return "His"
    }
    else if (this.gender == "female") {
      return "Her"
    }
    else {
      return "Their"
    }
  }

  //once I know how to get sprites from APIs I'll finish this function
  getSprite() {
    if (this.species === "pichu") {
      return "https://i.imgur.com/ROK2yzd.png";
    }
  }
}

class Day {
  constructor(number, x) {
    this.number = parseInt(number);
    this.event = events[parseInt(x)];
  }
}

alert("Pokémon Pet Simulator");
alert("Hello there! Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof!");
alert("This world is inhabited by creatures called Pokémon! For some people, Pokémon are pets. Other use them for fights. Myself… I study Pokémon as a profession.");

var pokemon1 = new Pokemon("Pichu", GENDER_MALE, "no_sprite_yet", 56, 1, 24, 56, 99);
console.log(pokemon1);

let playerName = prompt("So, what is your name?") || "Player";
alert(`Right! So your name is ${playerName}!`);

alert(`First, let me introduce you to your very own Pokémon: ${pokemon1.species}! This little boy is an electric type Pokémon. ${pokemon1.species}s are often social Pokémons known for their playful and mischievous demeanor.`);

pokemon1.customName = prompt(`What will be ${pokemon1.species}'s name?`) || pokemon1.species;

const REGEX_POKEMON_NAME = /\D+$/i;

while (!REGEX_POKEMON_NAME.test(pokemon1.customName)) {
  pokemon1.customName = prompt("That's not a name! Choose another one");
}

alert(`So ${pokemon1.pokemonPronoun()} name is ${pokemon1.customName}!`);

alert(`${playerName}! ${pokemon1.customName}! Your very own Pokémon legend is about to unfold! A world of dreams and adventures with Pokémon awaits! Let's go!`)

alert("You can stop playing by typing ESC.")

var events = [
  "Apparently today there's gonna be some crazy discounts at the PokeShop in town!",
  "Brrr... The weather suddenly got really cold. Better pack a jacket!",
  "It seems something is happening in the forest nearby. Maybe you should check it out!", "Wear some sunscreen today because it's gonna be really hot!",
  "There's a special discount today at the PokePark if you bring along your Pokémon! You should check it out!",
  "A mysterious Pokémon has apparently been sighted near the beach! You should be careful if you plan on going there!",
  "A new festival is in town! Wanna go check it out?",
  `It's Chesto Berry season! They're ${pokemon1.customName}'s favorite! You should go grab some!'`
];

// var eventsLength = events.length;
//
// for (let i = 0; i < eventsLength; i++) {
//   console.log(events[i])
// }

const days = [];

days.push(new Day(1, 1));
days.push(new Day(2, 2));
days.push(new Day(3, 4));
days.push(new Day(4, 1));
days.push(new Day(5, 3));
days.push(new Day(6, 6));
days.push(new Day(7, 5));

var dayEvents = days.map(days => "Day " + days.number + " - " + days.event)

//Handles day to day events
for (var index = 0; index < days.length; index++) {
  let currentLevel = pokemon1.lv

  alert(dayEvents[index]);
  // Handles daily hunger points
  if (pokemon1.hunger < 50) {
    const feedResponse = prompt(`${pokemon1.customName} seems to be hungry! Type FEED if you want to give him some treats!`)?.toLowerCase();
    if (feedResponse === "feed") {
      pokemon1.addHunger(40);
      alert("He seems to love it!\n(+20 hunger points)");
      alert(pokemon1.hunger + " points of satiation!");
    }
    else if (feedResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      pokemon1.addHunger(-30);
      alert("Too bad! He seemed to be very hungry.");
      alert(pokemon1.hunger + " points of satiation.");
    }
  }
  else {
    alert(`${pokemon1.customName} seems to be well fed lately. Good job!`);
  }
  pokemon1.addHunger(-30);

  // Handles daily rest points
  if (pokemon1.rest < 40) {
    const restResponse = prompt(`${pokemon1.customName} seems to be tired! Type REST if you want to cuddle him to sleep.`)?.toLowerCase();
    if (restResponse === "rest") {
      pokemon1.addRest(40);
      alert("He's fast asleep.\n(+20 rest points)");
      alert(pokemon1.rest + " points of rest!");
    }
    else if (restResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      pokemon1.addRest(-20);
      alert(`Poor thing, ${pokemon1.pokemonPronoun()} seems to lack some sleep.`);
      alert(pokemon1.rest + " points of rest.");
    }
  }
  else {
    alert(`${pokemon1.customName} is energized as always. Look at it run!`);
  }
  pokemon1.addRest(-20);

  // Handles daily fun points
  if (pokemon1.fun < 60) {
    const funResponse = prompt(`${pokemon1.customName} looks bored Type PLAY if you want to play catch!`)?.toLowerCase();
    if (funResponse === "play") {
      pokemon1.addFun(30);
      alert("You can feel the joy in the air!\n(+20 fun points)");
      alert(pokemon1.fun + " points of fun!");
    }
    else if (funResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      pokemon1.addFun(-20);
      alert("Maybe some other time...");
      alert(pokemon1.fun + " points of fun.");
    }
  }
  else {
    alert(`${pokemon1.customName} seems happy!`)
  }
  pokemon1.addFun(-20);

  if (currentLevel!=pokemon1.lv) {
    alert(`${pokemon1.customName} leveled up! ${pokemon1.pokemonPronoun()} level is now ${pokemon1.lv}`);
  }

  if (index == days.length - 1) {
    alert("You made it to the end of the week!");
  }
}

alert("Thank you for playing this short demo of the simulator!\nPress F5 to play again!");
