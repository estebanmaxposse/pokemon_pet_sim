alert("Pokémon Pet Simulator");
alert("Hello there! Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof!");
alert("This world is inhabited by creatures called Pokémon! For some people, Pokémon are pets. Other use them for fights. Myself… I study Pokémon as a profession.");

let playerName;
playerName = prompt("So, what is your name?") || "Player";
alert("Right! So your name is " + playerName + "!");
alert(playerName + "! " + "Your very own Pokémon legend is about to unfold! A world of dreams and adventures with Pokémon awaits! Let's go!")

function getRandomInt(min, max) {
  min = Math.ceil(0);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1) + min);
  }

alert("First, let me introduce you to your very own Pokémon: Pichu! This little boy is an electric type Pokémon. Pichus are often social Pokémons known for their playful and mischievous demeanor.");

let pokemonName;
pokemonName = prompt("What will be Pichu's name?") || "Pichu";

const re = /\D+$/i;

while (!re.test(pokemonName)) {
  pokemonName = prompt("That's not a name! Choose another one");
}

alert("So his name is " + pokemonName + "!");

console.log(getRandomInt());
