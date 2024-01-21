/*--Load Constants---------------------------------------------------------------------------------------------------------------------------------*/
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/*--Start Server-----------------------------------------------------------------------------------------------------------------------------------*/
app.use(express.static(__dirname));
app.get("/",(req, res)=>{res.sendFile(__dirname+"/index.html")});
server.listen(5000,()=>{console.log("Running at port 5000")});

/*--Load Data--------------------------------------------------------------------------------------------------------------------------------------*/
let userData;
fs.readFile("./data.json",(error,data)=>{
    if(error) console.log("Error reading data from dist\n"+error);
    else userData = JSON.parse(data);
});

/*--Input/Output-----------------------------------------------------------------------------------------------------------------------------------*/
io.on("connection",(client)=>{
    client.on("add-score",(name,attempt)=>{
        let nameFound = false;
        for(let i = 0; i < userData.length; i++){
            if(userData[i].name === name){
                nameFound = true;
                userData[i].attempts.push(attempt);
                fs.writeFile("./data.json",JSON.stringify(userData,null,4),()=>{});
            }
        }
        if(!nameFound){
            userData.push({name:name,attempts:[attempt]});
            fs.writeFile("./data.json",JSON.stringify(userData,null,4),()=>{});
        }
    });
});