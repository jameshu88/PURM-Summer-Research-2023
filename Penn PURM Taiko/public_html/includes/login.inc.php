<?php

if (isset($_POST["sign-in"])) {
    
    $username = $_POST["username"];
    $password = $_POST["password"];

    if (empty($username) || empty($password)) {
        header("Location: ../log-cms-pnel.php");
    } else {
    
        require_once "/home/u431134951/domains/pennpurmtaiko.cloud/condbfiles/functions.php";
         
        $user = new User;
        
        $check = $user->checkPassword($username, $password);
      
        if ($check) {
            
             session_start();
            // Set the session cookie parameters
            session_set_cookie_params(7200);
            
            // Start the session
            session_start();
            
            // Set the session expiration time
            $expiryTime = time() + 7200; // 2 hours from now
            $_SESSION['expire_time'] = $expiryTime;
            $_SESSION['name'] = $username;
            
          
              // Dynamic symlink creation
            $targetFilePath = '/home/u431134951/domains/pennpurmtaiko.cloud/condbfiles/admin_panel.php';
            $symlinkFilePath = $_SERVER['DOCUMENT_ROOT'] . '/panel/admin_panel.php';
            
            if (!file_exists($symlinkFilePath)) {
                symlink($targetFilePath, $symlinkFilePath);
            } else {
                 header("Location: /panel/admin_panel.php");
            }
            
            // Include the symlinked file
            require_once($_SERVER['DOCUMENT_ROOT'] . '/symlink_folder/admin_panel.php');
            
            
            header("Location: /panel/");
        } else {
            header("Location: ../log-cms-pnel.php");
        }
    }
}
