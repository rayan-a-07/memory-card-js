const cards = document.querySelectorAll('.memory-card')
var hasFlipped = false
var lockBoard = false
var firstCard, secondCard


function flipCard() {
    if(lockBoard) {
        return        
    }

    if (this == firstCard) {
        return
    }

    this.classList.add('flip')

    if(!hasFlipped) {
        hasFlipped = true
        firstCard = this

        return
    } else {
        hasFlipped = false
        secondCard = this
    }

    checkForMatch()
}

function checkForMatch() {
    if(firstCard.dataset.name === secondCard.dataset.name) {
        disableCards()
    } else {
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(()=> {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false
    }, 1500)

}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        randomNumb = Math.floor(Math.random()*12)
        card.style.order = randomNumb
    })
})()

cards.forEach(card => card.addEventListener('click', flipCard))