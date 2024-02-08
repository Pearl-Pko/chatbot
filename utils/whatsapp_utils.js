const { autoResponse } = require("../autoResponse");
const {sendMessage, getTextMessageInput} = require("./messageHelper");

function processTextForWhatsApp(text) {
    // Remove brackets
    const pattern = /\【.*?\】/g;
    // Substitute the pattern with an empty string
    let processedText = text.replace(pattern, '').trim();

    // Pattern to find double asterisks including the word(s) in between
    const asteriskPattern = /\*\*(.*?)\*\*/g;
    // Replacement pattern with single asterisks
    const replacement = '*$1*';

    // Substitute occurrences of the pattern with the replacement
    processedText = processedText.replace(asteriskPattern, replacement);

    return processedText;
}

// function getTextMessageInput(recipient, text) {
//     return JSON.stringify({
//         messaging_product: "whatsapp",
//         recipient_type: "individual",
//         to: recipient,
//         type: "text",
//         text: { preview_url: false, body: text }
//     });
// }

function generateResponse(response) {
    // Return text in uppercase
    return response.toUpperCase();
}

function getUserText(body) {
    return body.entry[0].changes[0].value.messages[0].text.body;
}

function processWhatsAppMessage(body) {
    console.log(body);
    const waId = body.entry[0].changes[0].value.contacts[0].wa_id;
    const name = body.entry[0].changes[0].value.contacts[0].profile.name;

    const message = body.entry[0].changes[0].value.messages[0];
    const messageBody = message.text.body;

    // TODO: Implement custom function here
    // const response = generateResponse(messageBody);

    // OpenAI Integration
    // const response = generateResponse(messageBody, waId, name);
    // const responseForWhatsApp = processTextForWhatsApp(response);

    // const data = getTextMessageInput(process.env.RECIPIENT_WAID, response);
    const response = autoResponse([], messageBody)
    console.log(response);
    const data = getTextMessageInput(process.env.RECIPIENT_WAID, response);
    sendMessage(data);
}

function isValidWhatsAppMessage(body) {
    /**
     * Check if the incoming webhook event has a valid WhatsApp message structure.
     */
    return (
        body.object &&
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
    );
}

// Sample function placeholders, replace with actual implementations
function generateResponse(messageBody) {
    // Placeholder function for generating a response
    return `Received message: ${messageBody}`;
}

// function getTextMessageInput(recipientWaId, message) {
//     // Placeholder function for constructing message data
//     return {
//         recipientWaId,
//         message
//     };
// }

// function sendMessage(data) {
//     // Placeholder function for sending a message
//     // Use Axios or any other HTTP client library to send the message data
//     console.log("Sending message:", data);
//     // Example using Axios
//     // axios.post('your_send_message_endpoint', data)
//     //     .then(response => {
//     //         console.log("Message sent successfully:", response.data);
//     //     })
//     //     .catch(error => {
//     //         console.error("Error sending message:", error);
//     //     });
// }

// Export functions if needed
module.exports = {
    processWhatsAppMessage,
    isValidWhatsAppMessage,
    processTextForWhatsApp
};