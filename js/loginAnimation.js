let infoDiv = null;
let tysonDiv = null;
let tysonDivOpacity = 0;
let intervalIDShow = null;
let intervalIDHide = null;
let tysonLaugh = new Audio("audio/tysonLaughsAtYou.wav");

window.onload = () => {

	infoDiv = document.getElementById("wrongLoginInfo");
	tysonDiv = document.getElementById("mockingTyson");

	document.querySelector(".btn-connexion").onclick = () => {

		$.ajax({
			url : "ajaxLogin.php",
			type: "POST",
			data: {
				passwordLogin : document.getElementById("password").value,
				usernameLogin : document.getElementById("username").value,
			}
		})
		.done(response => {
			info = JSON.parse(response);

			if(info.length === 40){
				window.location.replace("gameSelect.php");
			}

			if(info == "EMPTY_USERNAME"){
				infoDiv.innerHTML = "You really think you can enter without a username?";
			}

			if(info == "TOO_MANY_CONNECTIONS_BAN" || info == "TOO_MANY_CONNECTIONS_BAN"){
				infoDiv.innerHTML = "You have been banned, fool!";
			}

			if(info == "USER_NOT_FOUND" || info == "CHARACTER_NOT_CREATED"){
				infoDiv.innerHTML = "Nope! Wrong username!";
			}

			if(info == "INVALID_USERNAME_PASSWORD"){
				infoDiv.innerHTML = "Can't remember your password, chump?";
			}

			if(info == "INVALID_USERNAME_PASSWORD" || info == "USER_NOT_FOUND" || info == "CHARACTER_NOT_CREATED" || info == "TOO_MANY_CONNECTIONS_BAN" || info == "TOO_MANY_CONNECTIONS_BAN" || info == "EMPTY_USERNAME"){
				intervalIDShow = setInterval(showMockIngTyson, 100);
			}

		});
	}

	let mainTheme = new Audio("audio/mainTheme.mp3");
	mainTheme.play();
	mainTheme.loop = true;

	tysonDiv.onclick = () => {
		intervalIDHide = setInterval(hideMockingTyson, 100);
	}
}

const showMockIngTyson = () => {
	if(tysonDivOpacity <= 1){
		tysonDivOpacity += 0.1;
		tysonDiv.style.opacity = tysonDivOpacity;
	}
	else{
		tysonLaugh.play();
		clearInterval(intervalIDShow);
	}
}

const hideMockingTyson = () => {
	if(tysonDivOpacity >= 0){
		tysonDivOpacity -= 0.1;
		tysonDiv.style.opacity = tysonDivOpacity;
	}
	else{
		tysonLaugh.pause();
		clearInterval(intervalIDHide);
	}

}