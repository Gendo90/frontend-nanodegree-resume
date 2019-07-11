/*
 * Create a list that holds all of your cards
 */
function createDeck() {
     // Initialize the deck
     cardList = [];

     // Create and add all <li> "cards" to the deck, 16 in total
     for (let i=0; i<16; i++) {
         let newCard = document.createElement("li");
         newCard.classList.add("card");
         cardList.push(newCard);
     }

     // Create and add <i> elements with icons to the cards
     // For loop runs twice because the cards are doubled up
     let shifter = null;
     let icon = null;

     for (let i=0; i<2; i++) {
         shifter = i*8;

         // Add diamond card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-diamond");
         cardList[0+shifter].appendChild(icon);

         // Add plane card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-paper-plane-o");
         cardList[1+shifter].appendChild(icon);

         // Add anchor card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-anchor");
         cardList[2+shifter].appendChild(icon);

         // Add bolt card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bolt");
         cardList[3+shifter].appendChild(icon);

         // Add cube card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-cube");
         cardList[4+shifter].appendChild(icon);

         // Add leaf card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-leaf");
         cardList[5+shifter].appendChild(icon);

         // Add bicycle card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bicycle");
         cardList[6+shifter].appendChild(icon);

         // Add bomb card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bomb");
         cardList[7+shifter].appendChild(icon);
     }

     return cardList;
 }


// Shuffle function from http://stackoverflow.com/a/2450976
// Used to change the order of the cards for each new game
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//  set up the event listener for a card. If a card is clicked:
//  (use the ul.deck as the event listener, give the card object to it using
//  the "event" parameter of its listener function)
function getClickedCards() {
    document.getElementById("deck").addEventListener("click", showCard);
}

// Function to help pause the code for animations
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

 // display the card's symbol
function showCard(event) {
    if(event.target.classList.contains("card")) {
        thisCard = event.target;
        if(!thisCard.classList.contains("match") && allOpenCards.length<=1) {
            if(allOpenCards.length!==1) {
                thisCard.style.animationPlayState = "running";
                setTimeout(function() {
                    thisCard.style.animationPlayState = "paused";
                }, 300);
                thisCard.classList.add("show", "open");
            }
            checkCards(thisCard);
        }
    }
}

 // global variable to store which cards are currently opened to be matched
 // and visible
allOpenCards = [];
// global variable used to reset the timer after a game ends or is restarted
let timerInterval = null;
function checkCards(card) {
    // Prevents the case where a card matches with itself!
    if(card!==allOpenCards[0]) {
        allOpenCards.push(card);
    }

    if(allOpenCards.length===1 && getMoveCount()==0 && timerInterval===null) {
        timerInterval = startTimer();
    }

    if(allOpenCards.length>1) {
        if(allOpenCards[0].firstElementChild.classList.value === allOpenCards[1].firstElementChild.classList.value) {

            // run function to lock cards open, matched correctly!
            allOpenCards = setMatchedCards(allOpenCards);
        }
        else {
            // run function to remove cards from "allOpenCards" and
            // function to hide them again (place in above function)
            allOpenCards = revertMismatch(allOpenCards);
        }

        // run function to increment move counter
        let moveCount = incrementMoves();

        // remove star if the moves indicate that the
        // player should have a lower rating
        if(moveCount==21) {
            removeStar();
        }
        else if(moveCount==26) {
            removeStar();
        }

        // run function to check if game is over and if so, stop game and
        // display game end message using another function
        // Note - needs to wait 300ms for final animation to end!
        setTimeout(checkAndSetGameOver, 300);

    }
}

// Locks matched cards as visible after they have been matched correctly
function setMatchedCards(matchedCards) {
    matchedCards[0].style.animationPlayState = "paused";
    // second card's animation needs to run to turn it over!
    matchedCards[1].style.animationPlayState = "running";
    // delay in execution due to animation duration
    setTimeout(function() {
        matchedCards[1].style.animationPlayState = "paused";
        matchedCards.pop().classList.add("match");
        matchedCards.pop().classList.add("match");
    }, 300);
    return matchedCards;
}

// Signals to the player that the cards are mismatched, and flips them over to
// hidden again
function revertMismatch(unmatchedCards) {
    // set card backgrounds to red to visually indicate they are not matches
    unmatchedCards[0].classList.add("mismatch");
    unmatchedCards[1].classList.add("mismatch");

    unmatchedCards[0].style.animationPlayState = "running";
    unmatchedCards[1].style.animationPlayState = "running";
    setTimeout(function() {
        unmatchedCards[0].style.animationPlayState = "paused";
        unmatchedCards[1].style.animationPlayState = "paused";
    }, 600);
    setTimeout(function() {
        unmatchedCards.pop().classList.remove("show", "open", "mismatch");
        unmatchedCards.pop().classList.remove("show", "open", "mismatch");
    }, 600);
    // Add a delay to see both cards before flipping them back around

    return unmatchedCards;
}

// Returns the total number of moves at this point in the game
function getMoveCount() {
    let moveCounter = document.querySelector(".moves");
    let currentMoveCount = Number(moveCounter.textContent);
    return currentMoveCount;
}

// Increases the move counter by one (1)
function incrementMoves() {
    let currentMoveCount = getMoveCount();
    currentMoveCount++;
    let moveCounter = document.querySelector(".moves");
    moveCounter.textContent = ""+(currentMoveCount);
    return currentMoveCount;
}

// Resets the move counter to 0
function resetMoveCounter() {
    let moveCounter = document.querySelector(".moves");
    moveCounter.textContent = "0";
}

// Removes one star from the player's rating
function removeStar() {
    let starList = document.querySelectorAll(".fa-star");
    for (let i=starList.length-1; i>=0; i--) {
        if(!starList[i].classList.contains("defunct")) {
            starList[i].classList.add("defunct");
            break;
        }
    }
}

// Returns how many stars are currently visible
function getStars() {
    let starList = document.querySelectorAll(".fa-star");
    let starCount = 0;
    for (let i=starList.length-1; i>=0; i--) {
        if(!starList[i].classList.contains("defunct")) {
            starCount++;
        }
    }
    return starCount;
}

// Resets the stars to the full 3-star value
function resetStars() {
    let starList = document.querySelectorAll(".fa-star");
    for (let i=starList.length-1; i>=0; i--) {
        if(starList[i].classList.contains("defunct")) {
            starList[i].classList.remove("defunct");
        }
    }
}

// Starts the timer and causes it to increment every second
function startTimer() {
    let thisInterval = setInterval(incrementTimer, 1000);
    return thisInterval;
}

// Returns the current timer value as an array of [minutes, seconds]
function getTimerValue() {
    let minutes = document.querySelector("#minutes").textContent;
    let seconds = document.querySelector("#seconds").textContent;
    return [Number(minutes), Number(seconds)];
}

// Increases the timer by one second at a time, with special cases for
// adding seconds if there are less than 10 seconds or if another minute
// must be added
function incrementTimer() {
    [minutes, seconds] = getTimerValue();
    if(seconds<9) {
        seconds++;
        document.querySelector("#seconds").textContent = "0"+seconds;
    }
    else if(seconds<59) {
        seconds++;
        document.querySelector("#seconds").textContent = seconds;
    }
    else if(minutes<9) {
        seconds = "00";
        minutes++;
        document.querySelector("#seconds").textContent = seconds;
        document.querySelector("#minutes").textContent = "0" + minutes;
    }
    else if(minutes<59) {
        seconds = "00";
        minutes++;
        document.querySelector("#seconds").textContent = seconds;
        document.querySelector("#minutes").textContent = minutes;
    }
    else {
        // reset the game if it takes an hour!
        setupReset();
    }
}

// Stops the timer running on the current game (used when the game is over)
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Resets the timer to 00:00 when a new game is started
function resetTimer() {
    stopTimer();
    document.querySelector("#seconds").textContent = "00";
    document.querySelector("#minutes").textContent = "00";
}

// Function that checks if all cards have been matched to signal that the
// current game has ended
function isGameOver() {
    let matchedCards = document.querySelectorAll('.card.match');
    if(matchedCards.length===16) {
        return true;
    }
    else {
        return false;
    }
}

// Message that is supplied to the gameOver() function to show to the player
// after the game ends. Separated from the gameOver() function to make both
// functions easier to understand and edit.
function gameOverMessage() {
    const firstLine = 'You have won the game!<br>';
    let secondLine = '';
    let thirdLine = '';
    let endTime = getTimerValue();
    let starRating = getStars();
    let starHTML = '<i class="fa fa-star"></i>';
    let starText = '';

    if(endTime[0]) {
        secondLine = 'Your time was ' + endTime[0] +
                            ' minutes and ' + endTime[1] +
                            ' seconds!<br>';
    }
    else {
        secondLine = 'Your time was ' + endTime[1] +
                            ' seconds!<br>';
    }

    for(i=0; i<getStars(); i++) {
        starText+=starHTML;
    }
    if(starText) {
        thirdLine = 'Your star rating was ' + starText;
    }
    // Now dead code, since there is a new one-star minimum
    else {
        thirdLine = 'Sorry, you got no stars. Keep trying!';
    }
    return firstLine+secondLine+thirdLine;
}

// Function that runs when all cards have been matched to end the game
// Stops the timer and sends the player a message explaining their stats from
// the last game, and resets the game when the player confirms having read
// the message
function gameOver() {
    stopTimer();
    swal.fire({
        type: 'success',
        title: 'Congratulations!',
        html: gameOverMessage(),
        confirmButtonText: 'Awesome',
        allowOutsideClick: false
    }).then(
            resetGame
  )
}

function checkAndSetGameOver() {
    if(isGameOver()) {
        console.log("The game is over! You won!");
        gameOver();
    }
}

// Overall function to run the game!
function runGame() {
     // Make the deck to be used
     let actualDeck = createDeck();

     // Shuffle the deck
     actualDeck = shuffle(actualDeck);

     // Place all cards onto the page, into the right <ul> element
     let webpageDeck = document.getElementById("deck");
     for (let i = 0; i<actualDeck.length; i++) {
         webpageDeck.appendChild(actualDeck[i]);
     }

     // run the function below when app is ready!
     getClickedCards();
}

// Resets the game to the starting state, with no cards flipped over, the
// the timer and move counter both set to 0, and the stars set to the full
// 3-star rating
function resetGame() {
    let deckContainer = document.getElementById("deck");
    while(deckContainer.firstChild) {
        deckContainer.removeChild(deckContainer.firstChild);
    }
    resetMoveCounter();
    resetStars();
    resetTimer();
    runGame();
}

// Adds an event listener to the reset button so that the game will restart
// if that button is clicked by a player
function setupReset() {
    document.getElementById("restart").addEventListener("click", function() {
        resetGame();
    });
}

// function that provides the text block explaining the game to the player
// output is passed to explainGame() so that it is easier to understand and
// edit each separate function
function gameInfo() {
    const gameInfoHTML = `Hello! The object of this game
                          is to match each pair of cards.
                          You can click a card to view it, and then
                          click another card to view it as well, and
                          the cards will remain visible if they are a
                          match. The cards will quickly become hidden again
                          if they are not a match. The game is over when
                          all cards have been matched. Have fun!`;
    return gameInfoHTML;
}

// run an alert window explaining the game when the window loads
function explainGame() {
    swal.fire({
        type: 'info',
        title: 'Matching Game',
        html: gameInfo(),
        confirmButtonText: 'Sounds good!',
        allowOutsideClick: false
    })
}

// function to explain and start the initial game
function setupGame() {
    explainGame();
    setupReset();
    runGame();
}

// explain and start the initial game when content is first loaded on the page
window.addEventListener('DOMContentLoaded', setupGame());
