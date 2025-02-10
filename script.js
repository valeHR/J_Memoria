let cards = [];
let flippedCards = [];
let matchedCards = 0;
let score = 0;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const board = document.getElementById('board');
const scoreDisplay = document.getElementById('score');

function startGame() {
  
  cards = [...cardValues, ...cardValues];
  cards = shuffle(cards);
  matchedCards = 0;
  flippedCards = [];
  score = 0;
  updateScore();

  board.innerHTML = '';
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', index);
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });
}

function flipCard() {
  if (flippedCards.length < 2) {
    const cardIndex = this.getAttribute('data-id');
    this.textContent = cards[cardIndex];
    this.classList.add('flipped');
    flippedCards.push({ card: this, value: cards[cardIndex] });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.value === secondCard.value) {
    matchedCards += 2;
    score += 10;
    flippedCards = [];
    updateScore();
    if (matchedCards === cards.length) {
      alert('¡Felicidades! Has ganado');
    }
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
      firstCard.card.textContent = '';
      secondCard.card.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}
