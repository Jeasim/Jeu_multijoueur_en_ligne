<?php
	require_once("action/CommonAction.php");

	class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if (!empty($_COOKIE["username"])) {
				$this->username = $_COOKIE["username"];
			}

			if($_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC){
				header("location:gameSelect.php");
				exit;
			}
		}
	}