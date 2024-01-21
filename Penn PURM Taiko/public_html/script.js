addEventListener('DOMContentLoaded', () => {
  let canvas = document.querySelector('.canvas'),
    context = canvas.getContext('2d');

  let iterationI = 1,
    iterationJ = 1;
  (i = 0), (j = 0), (k = 0), (time = [0, 0]), (interval = 0);

  let game = {
    start: false,
    bitTrack: [],
    sound: new Audio('Overdose.mp3'),
    cookie: false,
  };
  
  game.sound.volume = 0.5;
  

  window.game = game;

  let timeout = null;

  let date = new Date();
  let sprite = document.querySelector('.sprite');

  canvas.width = 800;
  canvas.height = 500;

  function animate(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (new Date() - date >= 80) {
      i += iterationI;
      j += iterationJ;
      date = new Date();
    }

    if (i > 6) {
      i = 6;
      iterationI = -iterationI;
    }

    if (i < 0) {
      i = 0;
      iterationI = -iterationI;
    }

    if (j > 3) {
      j = 3;
      iterationJ = -iterationJ;
    }

    if (j < 0) {
      j = 0;
      iterationJ = -iterationJ;
    }

    if (k > 1) {
      k = 0;
    }

    //background
    context.drawImage(sprite, 0, 0, 1143, 491, 0, 0, canvas.width, 350);

    //sand
    context.drawImage(sprite, 0, 1000, 762, 365, 0, 350, canvas.width, 350);

    //vulcano
    context.drawImage(sprite, 0, 491, 1143, 468, 0, 70, canvas.width, 280);

    // trees
    context.drawImage(sprite, 0, 1438, 1143, 300, 0, 170, canvas.width, 180);

    //shells
    context.save();
    context.translate(180, 350);
    context.rotate(Math.PI / 3.5);
    context.drawImage(sprite, 0, 1753, 203, 103, 16, 10, 32, 20);
    context.rotate(-Math.PI / 3.5);
    context.restore();

    context.save();
    context.translate(380, 450);
    context.rotate(-Math.PI / 3.5);
    context.drawImage(sprite, 0, 1753, 203, 103, 16, 10, 32, 20);
    context.rotate(Math.PI / 3.5);
    context.restore();

    context.save();
    context.translate(580, 400);
    context.rotate(-Math.PI / 7);
    context.drawImage(sprite, 0, 1753, 203, 103, 16, 10, 32, 20);
    context.rotate(Math.PI / 3.5);
    context.restore();

    //flowers
    context.drawImage(sprite, 224, 1753, 43, 43, 40, 430, 26, 26);
    context.drawImage(sprite, 224, 1753, 43, 43, 360, 380, 26, 26);
    context.drawImage(sprite, 224, 1753, 43, 43, 660, 440, 26, 26);

    //dancers
    context.drawImage(sprite, 1153 + 430 * i, 0, 430, 300, 70, 300, 140, 86);
    context.drawImage(sprite, 1153 + 430 * i, 0, 430, 300, 570, 300, 140, 86);

    context.drawImage(sprite, 1153 + 430 * i, 0, 430, 300, 240, 340, 140, 86);
    context.drawImage(sprite, 1153 + 430 * i, 0, 430, 300, 420, 340, 140, 86);

    //drum dancers
    context.drawImage(sprite, 1234, 389 + 260 * j, 306, 260, 40, 370, 100, 80);
    context.drawImage(sprite, 1561, 389 + 260 * j, 306, 260, 670, 370, 100, 80);

    //player drummer
    context.drawImage(
      sprite,
      2019 + 560 * k,
      404,
      560,
      526,
      canvas.width / 2 - 50,
      260,
      120,
      115
    );

    if (e - interval > 1000) {
      interval = e;
      time[1]--;

      if (Number(time[1]) < 0) {
        time[1] = 59;
        time[0]--;
      }
    }

    let newTime = '0' + time[0] + ':' + time[1];

    if (time[1].toString().length == 1) {
      newTime = '0' + time[0] + ':0' + time[1];
    }

    context.font = '40px Mukta, sans-serif';
    context.fillStyle = 'white';
    let txt = '00:00';
    let length = context.measureText(txt).width;
    context.fillText(newTime, canvas.width - length - 5, 40);

    let runAnimation = requestAnimationFrame(animate);

    if (time[0] == 0 && time[1] == 0) {
      updateDatabase(game.bitTrack, 'update', (r) => {
        console.log(r);
      });

      game.start = false;
      game.sound.pause();
      cancelAnimationFrame(runAnimation);

      document.querySelector('.end-game').style.display = 'flex';
    }
  }

  let addUsername = document.getElementById('username');
  if (document.getElementById('input-btn')) {
    document.getElementById('input-btn').addEventListener('click', (ev) => {
      ev.preventDefault();

      if (addUsername.value.length === 0) {
        addUsername.style.left = '8px';
        addUsername.addEventListener('transitionend', () => {
          addUsername.style.left = '-8px';
          addUsername.addEventListener('transitionend', () => {
            addUsername.style.left = '8px';
            addUsername.addEventListener('transitionend', () => {
              addUsername.style.left = '0px';
            });
          });
        });
      }

      if (addUsername.value.length > 4) {
        updateDatabase(addUsername.value, 'create', (r) => {
          if (r.success) {
            game.start = true;
            time = [
              Math.floor(game.sound.duration / 60),
              Math.floor(game.sound.duration % 60),
            ];

            animate();

            document.querySelector('.end-game').style.display = 'none';
            document.querySelector('.menu').style.display = 'none';
            document.querySelector('.canvas').classList.add('transition');

            game.sound.currentTime;
            game.sound.play();
          } else {
            popUp('Name is already taken');
          }
        });
      } else {
        popUp('Name is shorter than 4 characters');
      }
    });
  }

  document.addEventListener('keyup', (ev) => {
    if (ev.key === ' ' && !game.start) {
      if (document.cookie) {
        document.querySelector('.end-game').style.display = 'none';
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.canvas').classList.add('transition');

        game.start = true;
        game.bitTrack = [];
        time = [
          Math.floor(game.sound.duration / 60),
          Math.floor(game.sound.duration % 60),
        ];

        animate();
        game.sound.currentTime = 0;
        game.sound.play();
      } else {
        location.reload();
      }
    }

    if (ev.key === ' ' && game.start) {
      game.bitTrack.push(game.sound.currentTime.toFixed(1));
    }

    if (document.getElementById('username')) {
      document.getElementById('username').value = document
        .getElementById('username')
        .value.trim();
    }

    k++;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && game.start) {
      game.sound.pause();
    } else if (game.start) {
      game.sound.play();
    }
  });

  function popUp(string) {
    document.querySelector('.pop-up').style.display = 'block';
    document.querySelector('.pop-up').innerHTML = string;
    window.clearTimeout(timeout);

    timeout = setTimeout(() => {
      document.querySelector('.pop-up').style.display = 'none';
    }, 2500);
  }
});

function updateDatabase(value, action, callback) {
  // Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Set up the AJAX request
  xhr.open('POST', 'includes/add-user.php', true);

  // Set the request header for JSON data (optional)
  xhr.setRequestHeader('Content-Type', 'application/json');

  // check response
  xhr.onload = function () {
    let response = JSON.parse(xhr.responseText);
    callback(response);
  };

  xhr.onerror = () => {
    reject(new Error('Request failed'));
  };

  // Define the data to send
  let data = {
    value: value,
    action: action,
  };

  // Convert the data to a JSON string
  let jsonData = JSON.stringify(data);

  // Send the request with the JSON data
  xhr.send(jsonData);
}
