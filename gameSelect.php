<?php
	require_once("action/GameSelectAction.php");

	$action = new GameSelectAction();
	$action->execute();

	require_once("partial/header.php");
?>

<script src="js/gameSelect.js"></script>

<body id="gameSelectBody">


	<a href="userInfo.php" id="userInfo-btn" class="btn-lobby">User info</a>
	<a href="?logout=true" id="deconnexion" class="btn-lobby">Déconnexion</a>


	<h1>Choix de partie</h1>

	<div id="difficulty-imgs">
		<div id="imgEasy" class="img" onclick="selectDifficulty(1); adjustStyleDiffImgs(this)">Débutant</div>
		<div id="imgMedium" class="img" onclick="selectDifficulty(2); adjustStyleDiffImgs(this)">Intermédiaire</div>
		<div id="imgHard" class="img" onclick="selectDifficulty(3); adjustStyleDiffImgs(this)">Expert</div>
	</div>

	<div id="gloves">
		<div id="glove1" class="gloves" onclick="selectDifficulty(-1)"></div>
		<div id="glove2" class="gloves" onclick="selectDifficulty(0)"></div>
	</div>

	<div id="games"></div>

	<template id="game-template">
		<div class="game-name"></div>
		<div class="game-img"></div>
		<div class="game-level"></div>
		<div class="single-line-game">
			<div class="game-peopleInGame"></div>/<div class="game-maxConnectedPeople"></div>
		</div>
		<div class="single-line-game">
			<div class="game-current-hp"></div>/<div class="game-hp"></div>
		</div>
		<div class="game-type"></div>
	</template>




</body>

<?php
	require_once("partial/footer.php");