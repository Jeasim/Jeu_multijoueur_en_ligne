let previousGameState = -1;

let menuMusic = new Audio("audio/mainTheme.mp3");
let fightMusic = new Audio("audio/fightTheme.mp3");
let gameOver = new Audio("audio/gameOver.mp3");
let roundStart = new Audio("audio/roundStart.mp3");

let crowdChants = new Audio("audio/crowdChants.wav");
let bellRings = new Audio("audio/bellRings.wav");
let litteMacFalls = new Audio("audio/littleMacFalls.wav");
let littleMacPunch = new Audio("audio/littleMacPunchConnects.wav");

const updateMusic = (gameState) => {

    switch (gameState) {
        case 0:
            roundStart.play();
            previousGameState = gameState;
            break;
        case 1:
            fightMusic.play();
            previousGameState = gameState;
            break;
    }
}

const soundPlayer = (sound) => {

    switch (sound) {
        case "bellRings":
            bellRings.play();            
            break;
    
        case "crowdChants":
            crowdChants.play();
            break;
        
        case "litteMacFalls":
            litteMacFalls.play();
            break;

        case "litteMacPunch":
            litteMacPunch.play();
            break;
    }
}