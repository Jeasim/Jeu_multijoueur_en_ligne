<?php
	session_start();

	require_once("DAO/Connection.php");

	abstract class CommonAction {
		public static $VISIBILITY_MEMBER = 1;
		public static $VISIBILITY_PUBLIC = 0;

		private $visibility = null;

		public function __construct($visibility) {
			$this->visibility = $visibility;
		}

		public function execute() {
			if (isset($_GET["logout"])) {
				$data = array("key" => $_SESSION["key"]);
				Connection::callAPI("signout", $data);

				session_unset();
				session_destroy();
				session_start();
			}


			if (empty($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			if ($this->visibility > CommonAction::$VISIBILITY_PUBLIC) {
				if (!isset($_SESSION["key"])) {
					header("location:login.php");
					exit;
				}
			}

			$this->executeAction();
		}




		abstract protected function executeAction();
	}
