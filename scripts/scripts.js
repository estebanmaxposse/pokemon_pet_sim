alert("Pokémon Pet Simulator");
alert("Hello there! Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof!");
alert("This world is inhabited by creatures called Pokémon! For some people, Pokémon are pets. Other use them for fights. Myself… I study Pokémon as a profession.");

let playerName;
playerName = prompt("So, what is your name?") || "Player";
alert("Right! So your name is " + playerName + "!");

alert("First, let me introduce you to your very own Pokémon: Pichu! This little boy is an electric type Pokémon. Pichus are often social Pokémons known for their playful and mischievous demeanor.");

let pokemonName;
pokemonName = prompt("What will be Pichu's name?") || "Pichu";

const re = /\D+$/i;

while (!re.test(pokemonName)) {
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

function mySubstraction(res, num) {
  let x = res - num;
  if (x < 0) {
    x = 0;
  }
  return x;
}

for (var day = 1; day <= 7; day++) {
  alert("Day " + day);
  if (food < 50) {
    const feedResponse = prompt(pokemonName + " seems to be hungry! Type FEED if you want to give him some treats!")?.toLowerCase();
    if (feedResponse === "feed") {
      alert("He seems to love it!\n(+20 hunger points)");
      food = food + 40;
      alert(food + " points of satiation!");
    }
    else if (feedResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      alert("Too bad! He seemed to be very hungry.");
      food = mySubstraction(food, 30);
      alert(food + " points of satiation.");
    }
  }
  else {
    alert("Pichu seems to be well fed lately. Good job!")
  }
  food = mySubstraction(food, 30);

  if (rest < 40) {
    const restResponse = prompt(pokemonName + " seems to be tired! Type REST if you want to cuddle him to sleep.")?.toLowerCase();
    if (restResponse === "rest") {
      alert("He's fast asleep.\n(+20 rest points)");
      rest = rest + 40;
      alert(rest + " points of rest!");
    }
    else if (restResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      alert("Poor thing, he seems to lack some sleep.");
      rest = mySubstraction(rest, 20);
      alert(rest + " points of rest.");
    }
  }
  else {
    alert("Pichu is energized as always. Look at him run!")
  }
  rest = mySubstraction(rest, 20);

  if (fun < 60) {
    const funResponse = prompt(pokemonName + " looks bored Type PLAY if you want to play with him!")?.toLowerCase();
    if (funResponse === "play") {
      alert("He is having the time of his life!\n(+20 fun points)");
      fun = fun + 30;
      alert(fun + " points of fun!");
    }
    else if (funResponse === "esc") {
      alert("Thank you for playing!");
      break;
    }
    else {
      alert("Maybe some other time...");
      fun = mySubstraction(fun, 20);
      alert(fun + " points of fun.");
    }
  }
  else {
    alert("Pichu seems happy!")
  }
  fun = mySubstraction(fun, 20);
  if (day == 7) {
    alert("You made it to the end of the week!");
  }
}

alert("Thank you for playing this short demo of the simulator!\nPress F5 to play again!")
