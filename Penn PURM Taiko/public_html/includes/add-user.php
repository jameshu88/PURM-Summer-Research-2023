<?php

require_once "functions.php";
require_once "db.php";

// Retrieve the raw POST data
$jsonData = file_get_contents('php://input');

// Check if any data was submitted
if (!empty($jsonData)) {
	// Decode the JSON data
	$data = json_decode($jsonData, true);

	// Check if the JSON data was successfully decoded
	if (is_array($data)) {
		// Access the individual values
		$content = $data['value'];
		$action = $data['action'];

		$response = ['success' => true];


		// Create an instance of the User class
		$user = new User();

		// Call the updateUser function on the $user instance
		if ($action === 'create') {

			$ip = $_SERVER['REMOTE_ADDR'];
			$value = $user->getUsernameCount($content);

			if ($value > 0) {

				$response = ['success' => false];
			} else {

				$cookieValue = array("name" => $content, "ip" => $_SERVER['REMOTE_ADDR'], "expirationDate" => time() + 180000);
				$enchodedArray = json_encode($cookieValue);
				setcookie("player", $enchodedArray, time() + 180000, '/');
				// setcookie("player", $enchodedArray, time() - 180000);

           
				$user->addUser($content, $ip);
		        $response = ['success' => true];
			}
		}

		if ($action === 'update') {

			$enchodedArray = json_decode($_COOKIE["player"]);
			$name = $enchodedArray->name;
			
			$value = $user->getUsernameCount($name);
			if($value == 0) {
			    setcookie("player",'', time() - 180000, '/');
			    
			    $response = ['success' => false];
			} else {
       			$song = json_encode($content);
    			$user = $user->update($name, $song);
    			$response = ['success' => true]; 
			}
		}

		// Send a response back to the AJAX request

		 echo json_encode($response);
	} else {
		// Error: Failed to decode JSON data
		$response = ['success' => false];
		 echo json_encode($response);
	}
} else {
	// Error: No data submitted
	$response = ['success' => false];
	 echo json_encode($response);
}






