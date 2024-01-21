<?php

if (isset($_POST["submit"])) {
	require_once "functions.php";

	$user = new User;

	$username = $_POST["username"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$passwordCheck = $_POST["password-verified"];

	if (empty($username) || empty($email) || empty($password) || empty($passwordCheck)) {

		header("Location: ../signup.php?one-of-the-fields-are-empty");
	} else if ($user->getUsername($username) > 0) {

		header("Location: ../signup.php?username-is-already-taken");
	} else if ($user->getEmail($email) > 0) {

		header("Location: ../signup.php?email-is-already-taken");
	} else if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match("/^[a-zA-Z0-9]*$/", $username)) {

		header("Location: ../signup.php?email-or-username-invalid");
	} else if ($password !== $passwordCheck) {

		header("Location: ../signup.php?the-passwords-are-not-a-match");
	} else {

		$hash = password_hash($password, PASSWORD_BCRYPT);
		$user->addUser($username, $email, $hash);
	}
}
