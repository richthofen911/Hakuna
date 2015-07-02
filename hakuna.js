//about writing data into firebase
//refName.child("childName").set("childContent") will create data in the structure of
//
//refName
//   |-----childName: "childContent"
//
//refName.child("childName").set({childName: "childContent"}) will create date in the structure of
//
//refName
//   |-----childName
//   |----------childName: "childContent"

var Firebase = require("firebase");
var readline = require('readline');

var refRoot = new Firebase("https://hakuna-matata.firebaseio.com/");

//readline from terminal
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("hakuna@.@: ", function (command) {
    checkPromptFlag(command);
});

function checkPromptFlag(cmd){
    if(cmd != "q")
        sendCommand(cmd);
    else{
        rl.close();
        process.exit();
    }
}

function sendCommand(cmdRaw) {
    //console.log(cmdRaw);
    refRoot.child("command").set(cmdRaw);
    refRoot.child("result").on("value", function (snapshot) {
        if(snapshot.val() != null){
            console.log(snapshot.val());
            refRoot.remove();
            rl.question("hakuna@.@: ", function (command) {
                checkPromptFlag(command);
            });
        }
    });
}


