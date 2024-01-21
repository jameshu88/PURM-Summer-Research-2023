<?php

session_start();
// echo $_SESSION['expire_time']- time();

if (!isset($_SESSION)) {
    
    header("Location: ../index.php");
    echo $_SESSION['expire_time'];
    exit;
}


if(time() - $_SESSION['expire_time'] > 0) {
    session_destroy();
    header("Location: ../log-cms-pnel.php");
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="../css/panel.css" />
</head>

<body>

    <div class="fetched-data">
        <h1>Players</h1>
            
        <div class="results">
            <div class="names"></div>
            <div class="values">
                <div class='value'>
                    <p></p>
                </div>
                <div class='value'>
                    <p></p>
                </div>
                <div class='value'>
                    <p></p>
                </div>
                
                <div class='value'>
                    <p></p>
                </div>
                <div class='value'>
                    <p></p>
                </div>
                
                <div class='value'>
                    <p></p>
                </div>
                
                <div class='value'>
                    <p></p>
                </div>
                
            </div>
            
        </div>
        
    </div>

    <script>
   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../includes/fetch.php', true);
        let names = document.getElementsByClassName('name');
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 400) {
            // Request successful, do something with the response
            let response = xhr.responseText;
            let dataDb = JSON.parse(response);
            
            dataDb.forEach((element,index)=> {
                let createSpan = document.createElement("span"),
                    createName = document.createElement("div"),
                    createParagraph = document.createElement("p");
                    createName.innerHTML = element.name;
                    createName.classList.add('name');
                    createSpan.classList.add('span');
                document.querySelector('.names').appendChild(createName);
                names[index].appendChild(createSpan);
                
                if(index === 0) {
                    document.querySelector('.name').classList.add('name-active');
                    document.querySelector('.span').classList.add('span-active');
                    
                    dataDb.forEach((elem)=>{
                    
                        if(elem.name === element.name) {
                            value = document.getElementsByClassName('value');
                            value[0].querySelector('p').innerHTML = JSON.parse(elem.run1);
                            value[1].querySelector('p').innerHTML = JSON.parse(elem.run2);
                            value[2].querySelector('p').innerHTML = JSON.parse(elem.run3);
                            value[3].querySelector('p').innerHTML = JSON.parse(elem.run4);
                            value[4].querySelector('p').innerHTML = JSON.parse(elem.run5);
                            value[5].querySelector('p').innerHTML = JSON.parse(elem.run6);
                            value[6].querySelector('p').innerHTML = JSON.parse(elem.run7);
                        }
                    })
                }
            })
            
                Object.keys(names).forEach(key => {
                    
                    names[key].addEventListener('click', (ev) => {
                
                    Object.keys(names).forEach(key => {
                       names[key].classList.remove('name-active');
                       names[key].lastChild.classList.remove('span-active');  
                    });

                        ev.target.classList.add('name-active');
                        ev.target.lastChild.classList.add('span-active');
                        
                        let name = ev.target.firstChild;
                     
    
                        dataDb.forEach((elem)=>{
                                let dataName = elem.name;
         
                            
                                if(name.data === elem.name) {
                                      
                                        console.log(elem.run2 == '');
                                        
                                    
                                 value = document.getElementsByClassName('value');
                                    value[0].querySelector('p').innerHTML = elem.run1 !== '' ? JSON.parse(elem.run1) : '';
                                    value[1].querySelector('p').innerHTML = elem.run2 !== '' ? JSON.parse(elem.run2) : '';
                                    value[2].querySelector('p').innerHTML = elem.run3 !== '' ? JSON.parse(elem.run3) : '';
                                    value[3].querySelector('p').innerHTML = elem.run4 !== '' ? JSON.parse(elem.run4) : '';
                                    value[4].querySelector('p').innerHTML = elem.run5 !== '' ? JSON.parse(elem.run5) : '';
                                    value[5].querySelector('p').innerHTML = elem.run6 !== '' ? JSON.parse(elem.run6) : '';
                                    value[6].querySelector('p').innerHTML = elem.run7 !== '' ? JSON.parse(elem.run7) : '';
                                }
                        })
                    })
                });
          } else {
            // Error handling
            console.error('Error:', xhr.status, xhr.statusText);
          }
        };
        
        xhr.onerror = function() {
          // Network error handling
          console.error('Network Error');
        };
        
        xhr.send();
   
    </script>
</body>

</html>