/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * This project allows the following practices:
 * How to create our fundamental game variables
 * How to generate a random number
 * How to manipulate the DOM
 * How to read from the DOM
 * How to change CSS styles
 */

var scores, roundScore, activePlayer, gamePlaying, winCon;
var player1 = 'Player 1';
var player2 = 'Player 2';


//  console.log(dice);

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);

init();

//Adding actions to be performed when the 'ROLL' button is clicked:
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying === true) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was not a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
}
);

//Adding actions to be performed when the 'HOLD' button is clicked:
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= winCon) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}
);

//Algorithm to switch player turns
function nextPlayer() {
    //Using ternary operator to switch from current player to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    

    document.querySelector('.dice').style.display = 'none';
}

//Welcome message and names setter:

function welcome() {
    alert("A Ⓒ doctr Production. Sponsored by, Tahrima Mohsin Mohona.");
    player1 = prompt('Welcome to TM\'s dice game! Player 1, please enter your gamertag:');
    player2 = prompt('Now it\'s player 2\'s turn:');
    alert(
        "To play, keep rolling the dice to add the yielding values to your CURRENT points.\n" +
        "If the dice yields 1, you loose all your CURRENT points, and it's your opponent's turn.\n" +
        "Click 'HOLD' to add your current points to your total score.\n" +
        "The first player to reach the desired total points win!"
    );
    winCon = prompt('Set the desired points (e.g - 100)');
    document.querySelector('#name-0').textContent = player1;
    document.querySelector('#name-1').textContent = player2;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //For gameplay
    welcome();

    //For testing
    //document.querySelector('#name-0').textContent = player1;
    //document.querySelector('#name-1').textContent = player2;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

/**
 * 3 PROPOSED MODIFICATIONS:
 * 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next 
 * player's turn. [Previous dice roll must be saved in a separate variable]
 * 2. [COMPLETED] Add an input field to the HTML where players can set the winning score, so that
 *  they can change predefined score of 100.
 * 3. Add another dice to the game, so that there are two dices now. The player looses his current
 * score when one of them is a 1. [Position the second dice using css]
 */