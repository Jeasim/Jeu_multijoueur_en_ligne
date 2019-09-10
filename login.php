<?php
    require_once("action/LoginAction.php");

    $action = new LoginAction();
    $action->execute();

    require_once("partial/header.php");
?>

<script src="js/loginAnimation.js"></script>

<body id="loginPageBody">
    <div class="errorBox"></div>

    <h2>JEAN-SIMON BONDAZ'S</h2>

    <div id="titleCard"></div>

    <div id="loginBox">
        <form action="login.php" method="post">
            <div class="singleLineField">
                <div class="infoField">
                     NOM D'USAGER:
                </div>
                <div class="answerField">
                    <input type="text" name="username" id="username" value="<?php if(isset($action->username)){echo $action->username;}?>" >
                </div>
            </div>

            <div class="singleLineField">
                <div class="infoField">
                    MOT DE PASSE:
                </div>
                <div class="answerField">
                    <input type="password" name="password" id="password">
                </div>
            </div>
        </form>

        <div class="singleLineField">
            <button class="btn-connexion">Connexion</button>
        </div>
    </div>

    <div id="mockingTyson">
        <div id="wrongLoginInfo"></div>
    </div>

</body>
<?php
    require_once("partial/footer.php");