<?php

class dbConnection
{

	private $servername;
	private $password;
	private $username;
	private $dbname;

	public function connect()
	{

		$this->servername = '127.0.0.1';
		$this->username = 'u431134951_drummer';
		$this->password = 'y^4J|D7b';
		$this->dbname = 'u431134951_drum_game';

		try {

			$dsn = 'mysql:host=' . $this->servername . ';dbname=' . $this->dbname;
			$conn = new PDO($dsn, $this->username, $this->password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $conn;
		} catch (PDOException $e) {
			echo 'Caught exception: ', $e->getMessage(), "\n";
		}
		
        return $conn;
		
	}
}
