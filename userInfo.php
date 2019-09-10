<?php
    require_once("action/UserInfoAction.php");

    $action = new UserInfoAction();
    $action->execute();

    require_once("partial/header.php");
?>

<script src="js/userInfoAnimation.js"></script>

<body id="userInfoBody">

    <div class="userInfos">

        <h1>Infos d'utilisateur</h1>

        <div class="singleInfoLine">
            <div class="infoType">Nom :</div>
            <div class="info" id="nom"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">HP :</div>
            <div class="info" id="hp"></div>
        </div>


        <div class="singleInfoLine">
            <div class="infoType">MP :</div>
            <div class="info" id="mp"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Niveau :</div>
            <div class="info" id="niveau"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Expérience :</div>
            <div class="single-line-game">
                <div class="info" id="exp"></div> /<div class="info" id="nextLevelExp"></div>
            </div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Victoires :</div>
            <div class="info"  id="victoires"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Défaites :</div>
            <div class="info" id="defaites"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Chances de feintes :</div>
            <div class="info"  id="dodge"></div>
        </div>

        <div class="singleInfoLine">
            <div class="infoType">Armure :</div>
            <div class="info" id="armure"></div>
        </div>

    </div>

    <div id="trainingMac"></div>
    <div id="trainingDoc"></div>

    <nav id="navUserInfo">
        <a href="gameSelect.php">Game Select</a>
        <a href="?logout=true">[déconnexion]</a>
    </nav>

</body>


<?php
    require_once("partial/footer.php");