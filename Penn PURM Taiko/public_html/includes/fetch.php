<?php 

    require_once "functions.php";
    
    $user = new User();
    $result = $user->fetchData();
    
    echo $result;
    
?>