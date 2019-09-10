<?php
	require_once("action/GameplayPageAction.php");

	$action = new GameplayPageAction();
	$action->execute();

    require_once("partial/header.php");
?>


<script src="js/TiledImage.js"></script>
<script src="js/animation.js"></script>
<script src="js/MikeTyson.js"></script>
<script src="js/LittleMac.js"></script>

<body id="gameplayPageBody">

	<!-- <div id="otherPlayersInfo">
		<div class="otherPlayerInfo" id="player2Info"></div>
		<div class="otherPlayerInfo" id="player3Info"></div>
		<div class="otherPlayerInfo" id="player4Info"></div>
	</div> -->

	<div id="otherPlayersInfo"></div>

	<template id="otherPlayer-template">
		<div class="otherPlayer-username" class="otherPlayerInfo"></div>
		<div class="otherPlayer-level" class="otherPlayerInfo"></div>
		<div class="single-line-game">
			<div class="otherPlayer-remaingHP" class="otherPlayerInfo"></div>/<div class="otherPlayer-MaxHP" class="otherPlayerInfo"></div>
		</div>
	</template>

	<!-- <a href="?logout=true" id="connexion" class="btn-quit">Déconnexion</a> -->
	<div id="lobby" class="btn-quit">Lobby</div>

    <div id="canvasContainer">

		<div class="characterBar" id="barMac">
			<div class="characterName">LITTLE MAC</div>
			<div class="hpBar">
				<div class="remainingHp" id="remainingHpMac"></div>
			</div>
			<div class="mpBar">
				<div id="remainingMp"></div>
			</div>
		</div>

		<div class="characterBar" id="barTyson">
			<div class="characterName">MIKE TYSON</div>
			<div class="hpBar">
				<div class="remainingHp" id="remainingHpTyson"></div>
			</div>
			<div id="mpBarTyson" class="mpBar">
				<div id="remainingMp"></div>
			</div>
		</div>


		<canvas id="canvas" width="1200" height="950">
			Upgrade your browser to fully enjoy life
		</canvas>
		<div id="attackButtons">
			<div id="attack1" class="attackButton">Normal</div>
			<div id="attack2" class="attackButton">Special 1</div>
			<div id="attack3" class="attackButton">Special 2</div>
		</div>

		<div id="endScreenWin" class="endScreen">
			VICTORY!<br>
			<a href="gameSelect.php">return to lobby</a>
		</div>
		<div id="endScreenLose" class="endScreen">
			DEFEATED!<br>
			<a href="gameSelect.php">return to lobby</a>
		</div>
	</div>





</body>

<?php
    require_once("partial/footer.php");