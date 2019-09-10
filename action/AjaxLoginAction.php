<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/Connection.php");

class AjaxLoginAction extends CommonAction {

	public $key = null;
	public $username = "";

	public function __construct() {
		parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
	}

	protected function executeAction() {

		if(isset($_POST["usernameLogin"])) {

			if(isset($_POST["passwordLogin"])){

				$data = [];
				$data["username"] = $_POST["usernameLogin"];
				$data["pwd"] = $_POST["passwordLogin"];

				$this->key = Connection::callAPI("signin", $data);

				if(strlen($this->key) === 40){
					$_SESSION["key"] = $this->key;
					$_SESSION["username"] = $_POST["usernameLogin"];
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;

					$this->username = $_POST["usernameLogin"];
					setcookie("username", $_POST["usernameLogin"], time() + 7200);
				}
			}
		}
	}
}
