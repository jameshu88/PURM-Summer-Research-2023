<?php 

     session_start();


    if(time() - $_SESSION['expire_time'] < 0) {
        header("Location: /panel/admin_panel.php");
    }
  
  

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/log-in.css">
    <title>Log In</title>
</head>

<body>

    <div class="log-in">

        <h1>Login panel</h1>

        <form action="./includes/login.inc.php" class="login-form" method="POST">
            <input type="text" name="username" placeholder="Enter name...">

            <input type="password" name="password" autocomplete="on" placeholder="Enter password...">

            <input type="submit" name="sign-in" value="Enter">
        </form>
    </div>

</body>

</html>