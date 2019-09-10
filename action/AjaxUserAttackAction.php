<?php
	require_once("action/CommonAction.php");

class AjaxUserAttackAction extends CommonAction {

        public $info;

    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    protected function executeAction() {

        $data = array("key" => $_SESSION["key"], "skill-name" => $_GET["attack"]);
		$this->info = Connection::callAPI("action", $data);
    }
}