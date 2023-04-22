const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'img2',
  'img3',
  'img1',
  'img4',
  'img5',
  'img6',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 12) {
    clearInterval(this.loop);
    const playerName = spanPlayer.innerHTML;
  
    // Converte o tempo para minutos caso tenha passado de 60 segundos
    const timeInSeconds = parseInt(timer.innerHTML);
    const timeInMinutes = Math.floor(timeInSeconds / 60);
    const timeInSecString = (timeInSeconds % 60).toString().padStart(2, '0');
    const timeMessage = `Seu tempo foi de: ${timeInMinutes} minuto(s) e ${timeInSecString} segundo(s)`;
  
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = `Parabéns, ${playerName}!`;
    
    const modalMessage = document.createElement('p');
    modalMessage.textContent = timeMessage;
    modalMessage.classList.add('modal-message');
    
    const modalButton = document.createElement('button');
    modalButton.textContent = 'Jogar novamente';
    modalButton.addEventListener('click', () => {
      window.location.href = "../index.html";
    });    
    
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(modalButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    const somMusicainicio = document.getElementById('somMusicainicio');
    const somAplausos = document.getElementById('somAplausos');
    somMusicainicio.pause();
    somAplausos.play();
  
  }
}




const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const showAllCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('reveal-card'));
  setTimeout(() => {
    cards.forEach(card => card.classList.remove('reveal-card'));
  }, 5000);
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  showAllCards(); // Mostrar todos os cartões por 5 segundos antes
  loadGame();
}


const revealAllCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.add('reveal-card');
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('reveal-card');
    });
  }, 4000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
  revealAllCards();
  
  const somMusicainicio = document.getElementById('somMusicainicio');
  somMusicainicio.play();
}
