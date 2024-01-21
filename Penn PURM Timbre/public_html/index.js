window.oncontextmenu = (e)=>{e.preventDefault()}
window.onload = initLoad;

let client = io(), username;
let audio = [], currAudio = null, roundCount = 1, final = [], time = 0, timeInterval;
function initLoad(){
    document.querySelector("#start-button").onclick = ()=>{
        document.querySelector("#name").value = "";
        fadeInElement("#name-window");
    }
    document.querySelector("#enter-username").onclick = ()=>{startGame()}
    document.querySelector("#play-button").onclick = playAudio;
}
function fadeInElement(query){
    let element = document.querySelector(query);
    element.style.animation = "fadeIn ease-in-out 0.2s";
    element.style.display = "block";
    element.onanimationend = ()=>{
        element.style.animation = "none";
        element.onanimationend = null;
    }
}
function fadeOutElement(query){
    let element = document.querySelector(query);
    element.style.animation = "fadeOut ease-in-out 0.2s";  
    element.onanimationend = ()=>{
        element.style.animation = "none";
        element.style.display = "none";
        element.onanimationend = null;
    }
}
function playAudio(){
    document.querySelector(".button-blocker").style.display= "block";
    let el1 = document.querySelector(".elephant-1");
    let el2 = document.querySelector(".elephant-2");
    let answerHolder = document.querySelector(".answer-holder");
    if(answerHolder.style.display != "block") fadeInElement(".answer-holder");
    if(currAudio === null){
        currAudio = audio.shift();
        timeInterval = setInterval(()=>{
            time++;
            let s = JSON.stringify(time % 60).padStart(2,"0");
            let m = JSON.stringify(Math.floor(time / 60)).padStart(2,"0");
            document.querySelector(".time-count").innerHTML = m+":"+s;
        },1000);
    }
   
    let same = false;
    if(currAudio < 10){
        let sound1 = new Audio("./Audio/Diff/"+(currAudio+1)+"/audio1.wav");
        sound1.oncanplaythrough = ()=>{
            el1.style.backgroundImage = "url('./Images/elephant1 playing.png')";
            sound1.play();
            sound1.onended = ()=>{
                el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
                let sound2 = new Audio("./Audio/Diff/"+(currAudio+1)+"/audio2.wav");
                sound2.oncanplaythrough = ()=>{
                    el2.style.backgroundImage = "url('./Images/elephant2 playing.png')";
                    sound2.play();
                    sound2.onended = ()=>{
                        el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
                        document.querySelector(".button-blocker").style.display= "none";
                    }
                }
            }
        }
        document.querySelector("#same").onclick = ()=>{
            clearInterval(timeInterval);
            document.querySelector(".time-count").innerHTML = "00:00";
            el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
            el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
            fadeOutElement(".answer-holder");
            final.push({correct:false,time:time});
            roundCount++;
            if(roundCount> 20){
                gameOver();
                return;
            }
            document.querySelector(".test-count").innerHTML = roundCount+"/20";
            document.querySelector(".button-blocker").style.display= "none";
            currAudio = null;
            time = 0;
        }
        document.querySelector("#not-same").onclick = ()=>{
            clearInterval(timeInterval);
            document.querySelector(".time-count").innerHTML = "00:00";
            el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
            el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
            fadeOutElement(".answer-holder");
            final.push({correct:true,time:time});
            roundCount++;
            if(roundCount> 20){
                gameOver();
                return;
            }
            document.querySelector(".test-count").innerHTML = roundCount+"/20";
            document.querySelector(".button-blocker").style.display= "none";
            currAudio = null;
            time = 0;
        }
    }
    else{
        same = true;
        let sound1 = new Audio("./Audio/Same/"+(currAudio%10+1)+"/audio.wav");
        sound1.oncanplaythrough = ()=>{
            el1.style.backgroundImage = "url('./Images/elephant1 playing.png')";
            sound1.play();
            sound1.onended = ()=>{
                el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
                let sound2 = new Audio("./Audio/Same/"+(currAudio%10+1)+"/audio.wav");
                sound2.oncanplaythrough = ()=>{
                    el2.style.backgroundImage = "url('./Images/elephant2 playing.png')";
                    sound2.play();
                    sound2.onended = ()=>{
                        el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
                        document.querySelector(".button-blocker").style.display= "none";
                    }
                }
            }
        }
        document.querySelector("#same").onclick = ()=>{
            clearInterval(timeInterval);
            document.querySelector(".time-count").innerHTML = "00:00";
            el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
            el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
            fadeOutElement(".answer-holder");
            final.push({correct:true,time:time});
            roundCount++;
            if(roundCount> 20){
                gameOver();
                return;
            }
            document.querySelector(".test-count").innerHTML = roundCount+"/20";
            document.querySelector(".button-blocker").style.display= "none";
            currAudio = null;
            time = 0;
        }
        document.querySelector("#not-same").onclick = ()=>{
            clearInterval(timeInterval);
            document.querySelector(".time-count").innerHTML = "00:00";
            el1.style.backgroundImage = "url('./Images/elephant1 idle.png')";
            el2.style.backgroundImage = "url('./Images/elephant2 idle.png')";
            fadeOutElement(".answer-holder");
            final.push({correct:false,time:time});
            roundCount++;
            if(roundCount> 20){
                gameOver();
                return;
            }
            document.querySelector(".test-count").innerHTML = roundCount+"/20";
            document.querySelector(".button-blocker").style.display= "none";
            currAudio = null;
            time = 0;
        }
    }
}
function startGame(){
    let name = document.querySelector("#name");
    if(!name.value) alert("You must input a name");
    else{
        username = name.value;
        let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
        audio = arr
        .map(value => ({ value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        fadeInElement(".game-screen");
    }
}
function gameOver(){
    let finalCount = 0;
    let roundHolder = document.querySelector(".round-holder");
    while(roundHolder.children.length > 0) roundHolder.removeChild(roundHolder.lastChild);
    for(let i = 0; i < final.length; i++){
        let round = document.createElement("div");
        if(!final[i].correct) round.className = "round wrong";
        else{
            round.className = "round correct";
            finalCount++;
        }
        roundHolder.appendChild(round);
    }
    document.querySelector(".result-final").innerHTML = finalCount+"/20";
    document.querySelector("#restart").onclick = ()=>{location.reload()}
    fadeInElement(".final-screen");
    client.emit("add-score",username,final);
}