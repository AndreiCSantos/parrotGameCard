const images = 
[
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let totalPairs;

function startGame() 
{
  let numberOfCards;
  do 
  {
      numberOfCards = prompt("Com quantas cartas quer jogar? (4 a 14, apenas números pares)");
  } 
  while (numberOfCards % 2 !== 0 || numberOfCards < 4 || numberOfCards > 14);

  totalPairs = numberOfCards / 2;

  const gameContainer = document.querySelector('.memory-game');
  gameContainer.innerHTML = '';

  const selectedImages = images.slice(0, totalPairs);
  const cardImages = [...selectedImages, ...selectedImages];

  cardImages.sort(() => 0.5 - Math.random());

  cardImages.forEach(img => 
  {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.dataset.framework = img;

      card.innerHTML = `
          <img class="front-face" src="img/${img}">
          <img class="back-face" src="img/back.png">
      `;

      card.addEventListener('click', flipCard);
      gameContainer.appendChild(card);
  });
}

function flipCard() 
{
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  moves++;

  if (!hasFlippedCard) 
  {
      hasFlippedCard = true;
      firstCard = this;
      return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() 
{
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() 
{
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  totalPairs--;
  if (totalPairs === 0) 
  {
      setTimeout(() => {
          alert(`Você ganhou em ${moves} jogadas!`);
      }, 1000);
  }

  resetBoard();
}

function unflipCards() 
{
  lockBoard = true;

  setTimeout(() => 
  {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
  }, 1000);
}

function resetBoard() 
{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

startGame();
