let spriteList = [];

let littleMac = null;
let mikeTyson = null;

let hpBarTyson = null;
let hpBarMac = null;
let mpBarMac = null;

let btnAttack1 = null;
let btnAttack2 = null;
let btnAttack3 = null;
let victoryScreen = null;
let defeatScreen = null;
let endScreenOpacity = 0;
let activeBtn = [];

let attack2Cost = null;
let attack3Cost = null;
let remainingMp = null;

let numberOfPlayers = 0;
let otherPlayersNode = null;

let gameOver = false;

let ctx = null;
let fightMusic = new Audio("audio/fightTheme.mp3");
let crowdChants = new Audio("audio/crowdChants.wav");
let bellRings = new Audio("audio/bellRings.wav");
let littleMacPunch = new Audio("audio/littleMacPunchConnects.wav");
let littleMacPunch2 = new Audio("audio/littleMacAttack2.wav");
let littleMacPunch3 = new Audio("audio/littleMacAttack3.wav");
let littleMacFalls = new Audio("audio/littleMacFalls.wav");
let tysonPunch = new Audio("audio/tysonPunchConnects.wav");
let tysonLaugh = new Audio("audio/tysonLaughsAtYou.wav");
let victoryMusic = new Audio("audio/victory.mp3");
let tysonFalls = new Audio("audio/tysonFalls.wav");
let defeatMusic = new Audio("audio/defeat.mp3");

window.onload = () => {

	createSprites();
	intializeBars();
	intializeAttackButtons();
	intializeQuitButtons();
	intializeEndScreens();
	startPageUpdate();
	playIntroSounds();
	setTimeout(startFightMusic, 3000);
	ctx = document.querySelector("#canvas").getContext("2d");
	otherPlayersNode = document.getElementById("otherPlayersInfo");
	tick();
}

const tick = () => {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < spriteList.length; i++){

		const sprite = spriteList[i];
		isAlive = sprite.tick();
	}


	window.requestAnimationFrame(tick);
}

const updatePage = () =>{

	$.ajax({
		url : "ajaxGameInfo.php",
		type: "POST",
		data: {}
	})
	.done(response => {
		info = JSON.parse(response);
		setTimeout(updatePage, 2001);

		if(info != "GAME_NOT_FOUND_LOST" && info != "GAME_NOT_FOUND_WIN"){

			adjustBar(info.game.hp, info.game.max_hp, hpBarTyson);
			adjustBar(info.player.hp, info.player.max_hp, hpBarMac);
			adjustBar(info.player.mp, info.player.max_mp, mpBarMac)

			attack2Cost = info.player.skills[1].cost;
			attack3Cost = info.player.skills[2].cost;
			remainingMp = info.player.mp;

			refreshAlliesStatus(info.other_players);

			if(info.game.attacked){
				mikeTyson.attack();
				setTimeout(() => littleMac.receiveHit(), 250);
				setTimeout(() => tysonPunch.play(), 750);
			}
		}
		else{
			setTimeout(fightMusic.pause(), 500);

			if(info == "GAME_NOT_FOUND_WIN" && !gameOver){
				depleteRemaingHPBar(hpBarTyson);
				mikeTyson.defeat();
				setTimeout(() => littleMac.victory(), 2200);
				setTimeout(() => victoryMusic.play(), 2200);
				tysonFalls.play();
				setTimeout(() => tysonFalls.pause(), 2200);
				setTimeout(() => victoryMusic.pause(), 8000);
				victoryScreen.style.display = "block";
				setInterval(() => showEndScreen(victoryScreen), 100);
				gameOver = true;
			}

			if(info == "GAME_NOT_FOUND_LOST" && !gameOver){
				depleteRemaingHPBar(hpBarMac);
				littleMac.defeat();
				littleMacFalls.play()
				setTimeout(() => littleMacFalls.pause(), 1600);
				setTimeout(() => mikeTyson.victory(), 1500);
				setTimeout(() => tysonLaugh.play(), 1600);
				setTimeout(() => victoryMusic.pause(), 500);
				setTimeout(() => defeatMusic.play(), 1500);
				defeatScreen.style.display = "block";
				setInterval(() => showEndScreen(defeatScreen), 100);
				gameOver = true;
			}

			if(gameOver){
				disableAttackEvents();
			}
		}

	});
}

const attack = (attackName) => {
	disableAttackEvents();
	$.ajax({
		url : "ajaxUserAttack.php",
		type: "GET",
		data: {
			attack : attackName
		}
	})
	.done(response => {
		info = JSON.parse(response);
		selectMacAttack(attackName);
		setTimeout(restoreAttackEvents, 2000);
	});

}

const selectMacAttack = (attackName) => {
	switch (attackName) {
		case "Normal":
			littleMac.macAttack1();
			setTimeout(() => mikeTyson.receiveHit(), 400);
			setTimeout(() => littleMacPunch.play(), 400);
			break;

		case "Special1":
			littleMac.macAttack2();
			setTimeout(() => littleMacPunch3.play(), 500);
			break;

		case "Special2":
			littleMac.macAttack3();
			setTimeout(() => littleMacPunch2.play(), 300);
			setTimeout(() => mikeTyson.receiveHit(), 500);
			break;
		}
}

const disableAttackEvents = () => {
	btnAttack1.style.pointerEvents = "none";
	btnAttack2.style.pointerEvents = "none";
	btnAttack3.style.pointerEvents = "none";

	btnAttack1.style.opacity = "0.5";
	btnAttack2.style.opacity = "0.5";
	btnAttack3.style.opacity = "0.5";
}

const disableAttackEvent = (node)  => {
	node.style.opacity = "0.5";
	node.style.pointerEvents = "none";
}

const restoreAttackEvents = () => {

	btnAttack1.style.pointerEvents = "auto";
	btnAttack1.style.opacity = "1";

	if(attack2Cost < remainingMp){
		btnAttack2.style.pointerEvents = "auto";
		btnAttack2.style.opacity = "1";
	}

	if(attack3Cost < remainingMp){
		btnAttack3.style.pointerEvents = "auto";
		btnAttack3.style.opacity = "1";
	}

}


const depleteRemaingHPBar = (node) => {
	node.style.width = "0%";
}

const adjustBar = (points, maxPoints, node) => {
	let pointsPourcentage = points / maxPoints * 100;
	node.style.width = pointsPourcentage + "%";
}

const createSprites = () => {
	littleMac = new LittleMac();
	mikeTyson = new MikeTyson();

	spriteList.push(mikeTyson);
	spriteList.push(littleMac);
}

const intializeBars = () => {
	hpBarTyson = document.getElementById("remainingHpTyson");
	hpBarMac = document.getElementById("remainingHpMac");
	mpBarMac = document.getElementById("remainingMp");
}

const intializeAttackButtons = () => {
	btnAttack1 = document.getElementById("attack1");
	btnAttack2 = document.getElementById("attack2");
	btnAttack3 = document.getElementById("attack3");

	btnAttack1.addEventListener("click", function(){
		attack("Normal");
	})

	btnAttack2.addEventListener("click", function(){
		attack("Special1");
	})

	btnAttack3.addEventListener("click", function(){
		attack("Special2");
	})
}

const intializeQuitButtons = () => {
	document.getElementById("lobby").onclick = () => {
		window.location.replace("gameSelect.php");
	}
}

const intializeEndScreens = () => {
	victoryScreen = document.getElementById("endScreenWin");
	defeatScreen = document.getElementById("endScreenLose");
}

const startPageUpdate = () => {
	setTimeout(updatePage, 3000);
}

const startFightMusic = () => {
	bellRings.play();
	fightMusic.play();
	crowdChants.pause();
}

const playIntroSounds = () => {
	crowdChants.play();
	crowdChants.loop = true;
}

const showEndScreen = (node) => {
	if(endScreenOpacity <= 1){
		endScreenOpacity += 0.02;
		node.style.opacity = endScreenOpacity;
	}
}


const refreshAlliesStatus = (other_players) => {

	while (otherPlayersNode.firstChild){
		otherPlayersNode.removeChild(otherPlayersNode.firstChild);
	}
		let charHTML2 = document.querySelector("#otherPlayer-template").innerHTML;

		let nodeH1 = document.createElement("h1");
		nodeH1.innerHTML = "Allies";
		otherPlayersNode.appendChild(nodeH1);


		for (let index = 0; index < other_players.length; index++) {
			const otherPlayer = other_players[index];
			let node = document.createElement("div");
			node.setAttribute("class", "otherPlayerInfo");
			node.innerHTML = charHTML2;

			node.querySelector(".otherPlayer-username").innerHTML = otherPlayer.name;
			node.querySelector(".otherPlayer-level").innerHTML = otherPlayer.level;
			node.querySelector(".otherPlayer-remaingHP").innerHTML = otherPlayer.hp;
			node.querySelector(".otherPlayer-MaxHP").innerHTML = otherPlayer.max_hp;

			otherPlayersNode.appendChild(node);
		}


}
