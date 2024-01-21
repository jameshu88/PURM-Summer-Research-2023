<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <form action="./includes/signup.inc.php" method="POST">
        <label for="name">Name</label>
        <input type="text" name="username" placeholder="Name...">
        <br>

        <label for="name">Email</label>
        <input type="text" name="email" placeholder="Email...">
        <br>

        <label for="name">Password</label>
        <input type="password" name="password" placeholder="Password...">
        <br>
        <label for="name">Password check</label>
        <input type="password" name="password-verified" placeholder="Password...">
        <br>
        <input type="submit" name="submit">

    </form>

</body>

</html>