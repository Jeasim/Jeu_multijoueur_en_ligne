<?php
	require_once("action/AjaxGameEnterAction.php");

	$action = new AjaxGameEnterAction();
    $action->execute();

	echo json_encode($action->info);