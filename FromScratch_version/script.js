const selectionButtons = document.querySelectorAll('[data-selection]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const finalColumn = document.querySelector('[data-final-column]');
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '🧊',
        beats: "scissors"
    },
    {
        name: 'paper',
        emoji: '📃',
        beats: "rock"
    },
    {
        name: 'scissors',
        emoji: '✂️',
        beats: "paper"
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    });
});

/**
 * 
 * @param {*} selection 
 */
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if(yourWinner) incrementScore(yourScoreSpan);
    if(computerWinner) incrementScore(computerScoreSpan);
}

/**
 * auxiliar function to check who's the winner.
 * @param {*} selection your own selection
 * @param {*} opponentSelection random selection generated
 * @returns true if selected beats computer, false otherwise
 */
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

/**
 * makes a random selection from 0 to 2.
 * @returns object in array SELECTIONS with the random index.
 */
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

/**
 * adds the emojis of both side's selections and highlights the winner
 * @param {*} selection 
 * @param {*} winner 
 */
function addSelectionResult(selection, winner){
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

/**
 * auxiliar function to increment the winners counter by one.
 * @param {*} scoreSpan span of the winner to increment.
 */
function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}