<?php
	require_once("action/AjaxGameSelectAction.php");

	$action = new AjaxGameSelectAction();
    $action->execute();

	echo json_encode($action->info);