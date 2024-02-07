const prompt = require("prompt-sync")({ sigint: true });

const userResponse = (history) => {
    const response = prompt("User: ");
    return response;
}

module.exports = {userResponse};