<?php
	require_once("action/AjaxUserAttackAction.php");

	$action = new AjaxUserAttackAction();
    $action->execute();

	echo json_encode($action->info);