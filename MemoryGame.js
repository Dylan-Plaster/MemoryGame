const gameContainer = document.getElementById("game");
const button = document.querySelector('button');
let body = document.querySelector('body');
let cardsMatched = null;
let card1 = null;
let card2 = null;
let noClicking = false;
let gameStarted = false

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('card');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

button.addEventListener('click', startGame);
function startGame(){
  gameStarted = true;
  button.removeEventListener('click', startGame);
  button.innerText = 'New Game';
  button.addEventListener('click', newGame);
}
function newGame(){
  gameStarted = false;
  card1 = null;
  card2 = null;
  noClicking = false;
  cardsMatched = null;
  button.removeEventListener('click', newGame);
  button.innerText = "Start";
  button.addEventListener('click', startGame);
  // document.querySelectorAll("card").style.backgroundColor = '';
  // document.querySelectorAll("card").classList.remove('flipped');
  // console.log(document.querySelectorAll('.card'));
  allCards = document.querySelectorAll('.card');
  let shuffledColors = shuffle(COLORS);

  for (card of allCards){    
    card.className = '';
    card.style.backgroundColor = body.style.backgroundColor;
    card.classList.remove('flipped');
    card.addEventListener('click', handleCardClick);
  }
  for (let i=0; i<=allCards.length; i++){
    allCards[i].classList.add(shuffledColors[i]);
    allCards[i].classList.add('card');
  }
}
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (!gameStarted) return;
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;
  console.log("you just clicked", event.target);
  clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  if (!card1 || !card2){
    card1 = card1 || clickedCard; 
    clickedCard.classList.add('flipped');
    card2 = card1 === clickedCard ? null:clickedCard;
  }

  if (card1 && card2){
    noClicking = true
    // cardsMatched += 2;
    color1 = card1.classList[0];
    color2 = card2.classList[0];

    if (color1 === color2){
      cardsMatched += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    }
    else{
      setTimeout(function(){
        card1.style.backgroundColor = body.style.backgroundColor;
        card2.style.backgroundColor = body.style.backgroundColor;
        card1.classList.remove('flipped');
        card2.classList.remove('flipped')
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000)
    }
  }
  if (cardsMatched >= COLORS.length) alert("GAME OVER");
}

// when the DOM loads
createDivsForColors(shuffledColors);
