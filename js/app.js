/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/24509760
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

function shuffleCards() {
    const $deck = $(".deck").first();
    const $shuffledCards = shuffle($deck.find(".card"));
    $shuffledCards.each(function(idx, card) {$deck.append(card);});
}

function coverCards() {
    $(".deck .card").each(function(idx, card){
        $(card).removeClass("match show");
    })
}

function setStars(number) {
    $(".stars li i").each(function(idx, el) {
        if (number > 0) {
            $(el).css("color", "black").removeClass("empty");
        } else {
            $(el).css("color", "lightgrey").addClass("empty");
        }
        number -= 1;
    })  
}

function reset() {
    coverCards();
    setUpGame();
}

function countStars() {
    return 3 - $(".stars .empty").length;
}

function updateStars(moves) {
    if (moves == 9) {
        setStars(2);
    } else if (moves == 17) {
        setStars(1);
    } else if (moves == 24) {
        setStars(0);
    } 
}

function getNowSeconds() {
    return Math.floor(Date.now() / 1000);
}

function setUpGrid() {
    const $deck = $(".deck").first();
    const $cards = $deck.find(".card");
    const $movesCounter = $(".moves").first();
    const startSeconds = getNowSeconds();
    let movesCounter = 0;
    let cardCounter = $cards.length;
    let cardList = [];

    $movesCounter.text("0");
    setStars(3);

    function showVictoryScreen() {
        const $modal = $(".modal");
        $modal.find(".final-moves").text(movesCounter);
        $modal.find(".final-stars").text(countStars());
        $modal.find(".final-seconds").text(getNowSeconds() - startSeconds);
        $modal.removeClass("invisible");
        $modal.find(".dismiss").off("click").on("click", function () {
            reset();
            $modal.addClass("invisible");
        });
    }

    function checkList() {
        if (cardList.length == 2) {
            const $card1 = cardList[0];
            const $card2 = cardList[1];
            const symbol1 = $card1.find("i")[0].className;
            const symbol2 = $card2.find("i")[0].className;
            if (($card1 !== $card2) && (symbol1 == symbol2)) {
                $card1.addClass("show");
                $card2.addClass("show");
                cardCounter -= 2;
                if (cardCounter == 0) {
                    setTimeout(showVictoryScreen, 500);
                }
            } else {
                setTimeout(function () {
                   $card1.removeClass("match");
                   $card2.removeClass("match");
                }, 1000)
            }
            cardList = [];
            movesCounter += 1;
            $movesCounter.text(movesCounter);
            starCounter = updateStars(movesCounter);
        }
    }

    $cards.each(function(idx, card) {
        const $card = $(this);
        $card.on("click", function() {
            $card.addClass("match");
            cardList.push($card);
            checkList();
        })
    })
}

function setUpGame(){
    shuffleCards();
    setUpGrid();
}

function init () {
    $(".restart").on("click", reset);
    setUpGame();
}


$(document).ready(init);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
