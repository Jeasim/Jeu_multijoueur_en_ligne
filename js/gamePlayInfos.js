window.onload = () =>{

	setInterval(updatePage, 4001);
}


const updatePage = () =>{

	$.ajax({
		url : "ajaxGameInfo.php",
		type: "POST",
		data: {}
	})
	.done(response => {
		info = JSON.parse(response);
		console.log(info);
		console.log(info.player.skills[0].name);

		$.ajax({
			url : "ajaxTest.php",
			type: "GET",
			data: {
				attack : info.player.skills.name
			}
		})
		.done(response2 => {
			info2 = JSON.parse(response2);
		console.log(info2);
	});
});

}