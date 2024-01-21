
<?php

    // echo $_COOKIE["player"];
    // echo (time() - $_COOKIE["expirationDate"])/3600;

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drum Game</title>
    <link rel="stylesheet" href="./css/style.css" />
</head>

<body>


    <canvas class="canvas initial-size"></canvas>

    <div class="menu">
        <img src="./images/menu-background.png" alt="menu" />

        <div class="dark-background-start"></div>

        <div class="wrap-menu-content">
            <div class="play">
                <h3>Press the play button to start!</h3>
            </div>
            <p class="gameplay-details">
                You will listen to a cool new song! To play the game, press the spacebar everytime you feel the beat during the song! All music © James Huang, 2023
            </p>

           <?php

           if (!isset($_COOKIE["player"])) {
                echo
                '<form name="form" action="includes/add-user.php" method="POST">
                    <input class="add-name" type="text" name="username" id="username" placeholder="Enter your name ..." pattern="^\S+$" />
                   <input type="submit" value="&#9658;" name="input-btn" id="input-btn"/>
                   </form>';
            }

            ?>

            <div class="pop-up"></div>

        </div>


    </div>

    <div class="end-game" style="display: none;">

        <div class="dark-background-end"></div>


        <p> Great job! </p>

        <h3>Tap the Spacebar to play again!</h3>

    </div>

    <img src="images/sprite1.png" alt="sprite" class="sprite" style="display: none" />

    <script src="script.js"></script>
</body>

</html>