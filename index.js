const {autoResponse} = require('./autoResponse');
const {userResponse} = require('./userResponse');
const {sendMessage, getTextMessageInput} = require("./messageHelper");
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()

router.use(bodyParser.json());

const write = (str) => process.stdout.write(str);


var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
sendMessage(data).then(function (res) {
    res.
});



console.log(process.env.ACCESS_TOKEN)

// const chat = () => {
//     chatHistory = []

//     while (true)
//     {
//         const userResponseText = userResponse(chatHistory);
//         // write("User: ");
//         // write(userResponseText);
//         // write('\n');

//         write("AI: ")
//         const autoResponseText = autoResponse(chatHistory, userResponseText);
//         write(autoResponseText);
//         write('\n');
        
//         chatHistory.push(4);

//         // history.push()

//         // console.log(`You are ${age} years old.`);

//     }

// }

// chat();