<?php
	require_once("action/CommonAction.php");

	class AjaxGameEnterAction extends CommonAction {

		public $info;

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			$data = array("key" => $_SESSION["key"], "id" => $_POST["gameId"]);
			$this->info = Connection::callAPI("enter", $data);
		}
	}