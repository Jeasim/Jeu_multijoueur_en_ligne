spriteList = [];
let trainingMusic = new Audio("audio/trainingTheme.mp3");
let nodeMac = null;
let nodeDoc = null;
let animationFrame = 1;
let macLeftPosition = 130;
let docLeftPosition = 110;

window.onload = () => {

    setTimeout(showUserInfo, 2001);

    trainingMusic.play();

    nodeMac = document.getElementById("trainingMac");
    nodeDoc = document.getElementById("trainingDoc");
    setInterval(animation, 100);
}

const showUserInfo = () => {

    $.ajax({
        url : "ajaxUserInfo.php",
        type: "POST",
        data: {}
    })
    .done(response => {

        info = JSON.parse(response);

        let textUSR = document.createTextNode(info.username);
        document.querySelector("#nom").appendChild(textUSR);

        let textHP = document.createTextNode(info.hp);
        document.querySelector("#hp").appendChild(textHP);

        let textMP = document.createTextNode(info.mp);
        document.querySelector("#mp").appendChild(textMP);

        let textLVL = document.createTextNode(info.level);
        document.querySelector("#niveau").appendChild(textLVL);

        let textEXP = document.createTextNode(info.exp);
        document.querySelector("#exp").appendChild(textEXP);

        let textEXPToNextLevel = document.createTextNode(info.next_level_exp);
        document.querySelector("#nextLevelExp").appendChild(textEXPToNextLevel);

        let textVICT = document.createTextNode(info.victories);
        document.querySelector("#victoires").appendChild(textVICT);

        let textLOSS = document.createTextNode(info.loss);
        document.querySelector("#defaites").appendChild(textLOSS);

        let textDODG = document.createTextNode(info.dodge_chance + "%");
        document.querySelector("#dodge").appendChild(textDODG);

        let textARM = document.createTextNode(info.dmg_red + "%");
        document.querySelector("#armure").appendChild(textARM);
    });
}


const animation = () => {

    if(animationFrame < 3){
        nodeMac.style.backgroundImage = "url('images/trainingMacFrame1.png')";
        animationFrame += 1;
    }
    else if(animationFrame == 3){
        nodeMac.style.backgroundImage = "url('images/trainingMacFrame2.png')";
        animationFrame = 1;
    }

    macLeftPosition -= 1.7;
    docLeftPosition -= 2.4;

    nodeMac.style.left = macLeftPosition + "%";
    nodeDoc.style.left = docLeftPosition + "%";

    if(macLeftPosition <= -20){
        macLeftPosition = 130;
        docLeftPosition = 110;
    }

}
