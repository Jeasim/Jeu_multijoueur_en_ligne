let animationFrame = 1;
let idInterval = null;
let currentAnimationGame = null;
let currentGameType = null;

let leftGlove  = null;
let rightGlove = null;
let leftGlovePos = 0;
let rightGlovePos = 0;

let bellRings = null;
let crowdChants = null;

let gamesNode = null;
let easyNode = null;
let mediumNode = null;
let hardNode = null
let selectedDifficulty = 2;
let easyGames = [];
let mediumGames = [];
let hardGames = [];
let voidGames = [];
let arenaGames = [];
let currentPlayerLevel = null;

let musicLobby = new Audio("audio/lobby.mp3");


window.onload = () => {

    loadingAnimation();
    setTimeout(showUserInfo, 2000);
    setTimeout(updatePage, 2000);
    setTimeout(playLobbyMusic, 2200);
    document.getElementById("gameSelectBody").style.backgroundColor = "black";
    gamesNode = document.querySelector("#games");
    easyNode = document.getElementById("imgEasy");
    mediumNode = document.getElementById("imgMedium");
    hardNode = document.getElementById("imgHard");
    document.querySelector("#gameSelectBody h1").style.display = "block";
    document.getElementById("difficulty-imgs").style.display = "flex";
}

const showUserInfo = () => {

    $.ajax({
        url : "ajaxUserInfo.php",
        type: "POST",
        data: {}
    })
    .done(response => {
        info = JSON.parse(response);
        currentPlayerLevel = parseInt(info.level);
    });
}


const updatePage = () => {

    $.ajax({
        url : "ajaxGameSelect.php",
        type: "POST",
        data: {}
    })
    .done(response => {
        info = JSON.parse(response);

        document.getElementById("gameSelectBody").style.backgroundColor = "black";

        if (idInterval !=null){
            clearInterval(idInterval);
        }

        while (gamesNode.firstChild){
            gamesNode.removeChild(gamesNode.firstChild);
        }

        let charHTML = document.querySelector("#game-template").innerHTML;

        for (let index = 0; index < info.length; index++) {
            let node = document.createElement("div");
            node.setAttribute("class", "game");
            node.innerHTML = charHTML;

            let game = info[index];

            node.querySelector(".game-name").innerHTML = game.name;
            node.querySelector(".game-level").innerHTML = game.level;
            node.querySelector(".game-peopleInGame").innerHTML = game.nb;
            node.querySelector(".game-maxConnectedPeople").innerHTML = game.max_users;
            node.querySelector(".game-current-hp").innerHTML = game.current_hp;
            node.querySelector(".game-hp").innerHTML = game.hp + " hp";
            node.querySelector(".game-type").innerHTML = game.type;

            let possibleToConnect = true;
            if(game.max_users === game.nb){
                possibleToConnect = false;
            }


            switch (game.type) {
                case "Melee":
                    node.querySelector(".game-img").style.backgroundImage = "url('images/game-Melee1.png')";
                    break;
            case "Range":
                    node.querySelector(".game-img").style.backgroundImage = "url('images/game-Range1.png')";
                    break;
            case "Heal":
                node.querySelector(".game-img").style.backgroundImage = "url('images/game-Heal1.png')";
                    break;
            case "Magic":
                node.querySelector(".game-img").style.backgroundImage = "url('images/game-Magic1.png')";
                    break;
            }

            document.getElementById("games").appendChild(node);



            if(possibleToConnect){

                node.addEventListener("click", function(){
                    enterGame(game.id);
                });

                node.addEventListener("mouseover", function(){
                    if (idInterval == null) {
                        idInterval = setInterval(() => animationBorder(this, game.type), 250);
                        currentAnimationGame = game.name;
                        currentGameType = game.type;
                    }
                });

                node.addEventListener("mouseleave", function(){
                    clearInterval(idInterval);
                    idInterval = null;
                    node.style.borderColor = "gold";
                    node.querySelector(".game-img").style.backgroundImage = "url(images/game-"+ currentGameType + "1.png)";
                    currentAnimationGame = null;
                    currentGameType = null;
                });
            }else{
                node.style.cursor = "not-allowed";
                node.style.border = "25px black double";
            }

            if(currentAnimationGame == game.name){
                idInterval = setInterval(() => animationBorder(node), 250);
            }

            let gameLevelINT = parseInt(game.level);

            if(gameLevelINT === -1){
                arenaGames.push(node);
            }

            if(gameLevelINT === 0){
                voidGames.push(node);
            }

            if( gameLevelINT > 0 && currentPlayerLevel > gameLevelINT){
                easyGames.push(node);
            }
            else if((gameLevelINT >= currentPlayerLevel) && (gameLevelINT < (currentPlayerLevel + 2))){
                mediumGames.push(node);
            }
            else if(currentPlayerLevel <= gameLevelINT){
                hardGames.push(node);
            }

        }
        showSelectedGames();

        setTimeout(updatePage, 6000);
    });
}

const showSelectedGames = () => {

    let toShow = [];
    let toHide = [];

    switch (selectedDifficulty) {

        case -1:
            toHide.push(...voidGames);
            toShow.push(...arenaGames);
            toHide.push(...easyGames);
            toHide.push(...mediumGames);
            toHide.push(...hardGames);
            break;

        case 0:
            toShow.push(...voidGames);
            toHide.push(...arenaGames);
            toHide.push(...easyGames);
            toHide.push(...mediumGames);
            toHide.push(...hardGames);
            break;

        case 1:
            toHide.push(...voidGames);
            toHide.push(...arenaGames);
            toShow.push(...easyGames);
            toHide.push(...mediumGames);
            toHide.push(...hardGames);
            break;

        case 2:
            toHide.push(...arenaGames);
            toHide.push(...voidGames);
            toHide.push(...easyGames);
            toShow.push(...mediumGames);
            toHide.push(...hardGames);
            break;

        case 3:
            toHide.push(...arenaGames);
            toHide.push(...voidGames);
            toHide.push(...easyGames);
            toHide.push(...mediumGames);
            toShow.push(...hardGames);
            break;
    }

    toShow.forEach(game => {
        game.style.display = "block";
    });

    toHide.forEach(game => {
        game.style.display = "none";
    });


}


const loadingAnimation = () => {

    bellRings = new Audio("audio/bellRings.wav");
    leftGlove = document.getElementById("glove1");
    rightGlove = document.getElementById("glove2");

    gloveAnimation();
}

const gloveAnimation = () => {

    if(leftGlovePos != 42){
        leftGlovePos += 1;
        rightGlovePos += 1;

        leftGlove.style.left = leftGlovePos + "%";
        rightGlove.style.right = rightGlovePos + "%";

        window.requestAnimationFrame(gloveAnimation);
    }
    else{
        document.getElementById("gameSelectBody").style.backgroundColor = "white";
        bellRings.play();
    }
}


const animationBorder = (node) => {

    if(animationFrame == 1){
        node.style.borderColor = "white";
        node.querySelector(".game-img").style.backgroundImage = "url(images/game-"+ currentGameType + animationFrame + ".png)";
        animationFrame = 0;
    }
    else{
        node.style.borderColor = "gold";
        node.querySelector(".game-img").style.backgroundImage = "url(images/game-"+ currentGameType + animationFrame + ".png)";
        animationFrame = 1;
    }
}

const selectDifficulty = (difficulty) => {
    resetDifficultyImgs();
    selectedDifficulty = difficulty;
    showSelectedGames();
}

const adjustStyleDiffImgs = (node) => {
    node.style.width = 350 + "px";
    node.style.height = 320 + "px";
    node.style.border = "10px gold solid";
}

const resetDifficultyImgs = () => {
    easyNode.style.width = 300 + "px";
    easyNode.style.height = 255 + "px";
    mediumNode.style.width = 300 + "px";
    mediumNode.style.height = 255 + "px";
    hardNode.style.width = 300 + "px";
    hardNode.style.height = 255 + "px";
    easyNode.style.border = "none";
    mediumNode.style.border = "none";
    hardNode.style.border = "none";
}



const enterGame = (id) => {

    $.ajax({
        url : "ajaxEnterGame.php",
        type: "POST",
        data: {
            gameId : id
        }
    })
    .done(response => {
        info = JSON.parse(response);
        window.location.href = 'gameplayPage.php';
    });

}

const playLobbyMusic = () => {
    musicLobby.play();
    musicLobby.loop = true;
}