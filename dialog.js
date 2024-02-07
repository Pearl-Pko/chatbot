class Dialog {
    constructor(response, requiredWords, recognisedWords) {
        this.response = response;
        this.requiredWords = requiredWords;
        this.recognisedWords = recognisedWords;
    }
}

module.exports = {Dialog}