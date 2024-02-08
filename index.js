const {autoResponse} = require('./autoResponse');
const {userResponse} = require('./userResponse');
const {sendMessage, getTextMessageInput} = require("./utils/messageHelper");
const {signatureRequired} = require('./middleware/security')
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const {isValidWhatsAppMessage, processWhatsAppMessage, processTextForWhatsApp} = require("./utils/whatsapp_utils")
require('dotenv').config()

const write = (str) => process.stdout.write(str);

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendStatus(200);
})

console.log(process.env.RECIPIENT_WAID);
const data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
// sendMessage(data).then( response => {
//     console.log(response.status);
// }
// )
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
app.get('/webhook', (req, res) => {
    // Parse params from the webhook verification request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) { // Replace process.env.VERIFY_TOKEN with your actual verify token
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            console.log("VERIFICATION_FAILED");
            res.status(403).json({ status: 'error', message: 'Verification failed' });
        }
    } else {
        // Respond with '400 Bad Request' if verify tokens do not match
        console.log("MISSING_PARAMETER");
        res.status(400).json({ status: 'error', message: 'Missing parameters' });
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    // console.log(`request body: ${JSON.stringify(body)}`);
    console.log((body));
    // Check if it's a WhatsApp status update
    if (body.entry && body.entry[0] && body.entry[0].changes && body.entry[0].changes[0] && body.entry[0].changes[0].value && body.entry[0].changes[0].value.statuses) {
        console.log("Received a WhatsApp status update.");
        res.status(200).json({ status: 'ok' });
        return;
    }

    try {
        if (isValidWhatsAppMessage(body)) {
            // console.log(processTextForWhatsApp(body));
            processWhatsAppMessage(body);
            res.status(200).json({ status: 'ok' });
        } else {
            // if the request is not a WhatsApp API event, return an error
            res.status(404).json({ status: 'error', message: 'Not a WhatsApp API event' });
        }
    } catch (error) {
        console.error("Failed to process request:", error.message);
        res.status(400).json({ status: 'error', message: 'Invalid request' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running and listening on http://localhost:${process.env.PORT}`);
});