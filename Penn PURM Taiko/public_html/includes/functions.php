<?php

require_once "db.php";


class User extends dbConnection
{

    	function getUsernameCount($name)
	{
		$stmt = $this->connect()->query("SELECT name FROM players WHERE name = '$name'");
		$stmt->execute();

		$count = $stmt->rowCount();

		return $count;
	}

	function getEmail($email)
	{
		$stmt = $this->connect()->query("SELECT email FROM players WHERE email = '$email'");
		$stmt->execute();
		$count = $stmt->rowCount();

		return $count;
	}

	function checkPassword($name, $password)
	{

		$stmt = $this->connect()->query("SELECT password FROM admin WHERE name = '$name'");
		$result = $stmt->fetch(PDO::FETCH_OBJ)->password;

		$check = password_verify($password, $result);

		return $check;
	}

	function addUser($name, $ip)
	{
		$this->connect()->query("INSERT INTO players (name, ip) VALUES ('$name','$ip')");
	}

	function update($name, $song)
	{
		$stmt = $this->connect()->query("SELECT * FROM players WHERE name = '$name'");
		$stmt->execute();
		$fetch = $stmt->fetch(PDO::FETCH_ASSOC);
		
		if($fetch === false) {
		   setcookie("player",'', time() - 180000);
		    return;
		}
		
		$index = $fetch['saved'] + 1;
		if ($index === 8) $index = 1;
		$column = 'run' . $index;

		$this->connect()->query("UPDATE players SET $column = '$song', `saved` = $index WHERE name = '$name'");
	}
	
	function fetchData(){
    	$stmt = $this->connect()->query("SELECT * FROM players");
		$stmt->execute();
		$fetch = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		echo json_encode($fetch);
	}
}



