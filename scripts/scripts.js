const GENDER_MALE = "male";
const GENDER_FEMALE = "female";

// Pokemon object to be implemented at a later date, this is a mockup of how the Pokemon object would work
class Pokemon {
  constructor(name, gender, sprite, exp, lv, hunger, rest, fun, happiness) {
    this.name = name;
    this.gender = gender;
    this.sprite = sprite;
    this.exp = parseInt(exp);
    this.lv = parseInt(lv);
    this.hunger = parseInt(hunger);
    this.rest = parseInt(rest);
    this.fun = parseInt(fun);
    this.happiness = parseInt((hunger + rest + fun)/3);

    this.get_gender = function() {
      if (this.gender === GENDER_MALE) {
        return "male"
      }
      else if (this.gender === GENDER_FEMALE) {
        return "female"
      }
      return "unknown"
    }

    //once I know how to get sprites from APIs I'll finish this function
    this.get_sprite = function() {
      if (this.name === "pichu") {
        return "https://i.imgur.com/ROK2yzd.png";
      }
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

let playerName;
playerName = prompt("So, what is your name?") || "Player";
alert("Right! So your name is " + playerName + "!");

const pichu = new Pokemon("Pichu", GENDER_MALE, "no_sprite_yet", 124, 2, 24, 56, 99);
console.log(pichu);

alert("First, let me introduce you to your very own Pokémon: Pichu! This little boy is an electric type Pokémon. Pichus are often social Pokémons known for their playful and mischievous demeanor.");

let pokemonName;
pokemonName = prompt("What will be Pichu's name?") || "Pichu";

const REGEX_POKEMON_NAME = /\D+$/i;

while (!REGEX_POKEMON_NAME.test(pokemonName)) {
  pokemonName = prompt("That's not a name! Choose another one");
}

alert("So his name is " + pokemonName + "!");

alert(playerName + "! " + pokemonName + "! " +"Your very own Pokémon legend is about to unfold! A world of dreams and adventures with Pokémon awaits! Let's go!")

alert("You can stop playing by typing ESC.")

function getRandomInt(min, max) {
  min = Math.ceil(0);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let food = getRandomInt();
let rest = getRandomInt();
let fun = getRandomInt();

function positiveNum (res, num) {
  let x = res - num;
  if (x < 0) {
    x = 0;
  }
  return x;
}

var events = ["Apparently today there's gonna be some crazy discounts at the PokeShop in town!", "Brrr... The weather suddenly got really cold. Better pack a jacket!", "It seems something is happening in the forest nearby. Maybe you should check it out!", "Wear some sunscreen today because it's gonna be really hot!", "There's a special discount today at the PokePark if you bring along your Pokémon! You should check it out!", "A mysterious Pokémon has apparently been sighted near the beach! You should be careful if you plan on going there!", "A new festival is in town! Wanna go check it out?"];

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
for (var index = 0; index <= 6; index++) {
  alert(dayEvents[index]);
  // Handles daily hunger points
  if (food < 50) {
    const feedResponse = prompt(pokemonName + " seems to be hungry! Type FEED if you want to give him some treats!")?.toLowerCase();
    if (feedResponse === "feed") {
      food = food + 40;
      alert("He seems to love it!\n(+20 hunger points)");
      alert(food + " points of satiation!");
    }
    else if (feedResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      food = positiveNum(food, 30);
      alert("Too bad! He seemed to be very hungry.");
      alert(food + " points of satiation.");
    }
  }
  else {
    alert("Pichu seems to be well fed lately. Good job!");
  }
  food = positiveNum(food, 30);

  // Handles daily rest points
  if (rest < 40) {
    const restResponse = prompt(pokemonName + " seems to be tired! Type REST if you want to cuddle him to sleep.")?.toLowerCase();
    if (restResponse === "rest") {
      rest = rest + 40;
      alert("He's fast asleep.\n(+20 rest points)");
      alert(rest + " points of rest!");
    }
    else if (restResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      rest = positiveNum(rest, 20);
      alert("Poor thing, he seems to lack some sleep.");
      alert(rest + " points of rest.");
    }
  }
  else {
    alert("Pichu is energized as always. Look at him run!");
  }
  rest = positiveNum(rest, 20);

  // Handles daily fun points
  if (fun < 60) {
    const funResponse = prompt(pokemonName + " looks bored Type PLAY if you want to play with him!")?.toLowerCase();
    if (funResponse === "play") {
      fun = fun + 30;
      alert("He is having the time of his life!\n(+20 fun points)");
      alert(fun + " points of fun!");
    }
    else if (funResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      fun = positiveNum(fun, 20);
      alert("Maybe some other time...");
      alert(fun + " points of fun.");
    }
  }
  else {
    alert("Pichu seems happy!")
  }
  fun = positiveNum(fun, 20);
  if (index == 7) {
    alert("You made it to the end of the week!");
  }
}

alert("Thank you for playing this short demo of the simulator!\nPress F5 to play again!");
