<?php
	require_once("action/AjaxLoginAction.php");

	$action = new AjaxLoginAction();
	$action->execute();

	echo json_encode($action->key);