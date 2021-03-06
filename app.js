const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let winner = document.getElementsByClassName("flip");
let modal = document.getElementById("myModal");

shuffle();


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    gameOver();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffle cards:
// flex-items are arranged by the following hierarchy: group and  order. Each group is defined by the order property, which holds a positive or negative integer.
// There are 12 cards in the game, so we will iterate through them, generate a random number between 0 and 12 and assign it to the flex-item order property, thus the cards will all be ordered differently each time this function is run.

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};

function gameOver() {
    if (winner.length === 12) {
        congratulations();

    } else
        return;
}

function congratulations() {

    modal.style.display = 'block';
    setTimeout(() => {
        playagain();
    }, 1500);
};


document.getElementById("exit").onclick = function () {
    modal.style.display = 'none';
};


function playagain() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    resetBoard();

};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));


