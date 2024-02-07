const { getCourseCredit } = require("./response_formats/getCourseCredit");
const {dialog} = require("./dialog");
const {getCurrentHod} = require("./response_formats/getCurrentHod")

const matchToken = (array, searchToken) => {
    //this supports matching both strings and regular expressions
    for (const token of array) {
        if (typeof token === "string" && token === searchToken) 
            return true;
        else if (token instanceof RegExp && token.test(searchToken))            
            return true;
    }
    return false;
}

const messageProbability = (userMessage, recognisedWords, singleResponse=false, requiredWords=[]) => {
    let messageCertainty = 0
    const hasRequiredWords = true;


    for (const word of userMessage) {
        if (matchToken(recognisedWords, word)) {
            messageCertainty += 1;
        }
    }

    percentage = messageCertainty / recognisedWords.length;

    for (const word of requiredWords)
    {
        if (matchToken(userMessage, word)) {
            hasRequiredWords = false;
            break;
        }
    }

    return (hasRequiredWords || singleResponse) ? percentage : 0;
};

const getMostLikelyDialog = (prob_list) => {
    let maxValue = -Infinity;
    let likelyDialog = null;

    for (const [key, value] of prob_list) {
        if (value > maxValue) {
            maxValue = value;
            likelyDialog = key;
        }
    }

    return likelyDialog;
}

const checkAllMessages = (message) => {
    const highest_prob_list = new Map();

    // const response = (bot_response, list_of_words, single_response=false, required_words=[]) => {
    //     highest_prob_list[bot_response] = messageProbability(message, list_of_words, single_response, required_words);
    // };
    const response = (dialog) => {
        highest_prob_list.set(dialog, messageProbability(message, dialog.recognisedWords, dialog.required_words));
    };

    // response(() => 'Hello!', ["hello", "hi", "sup", "hey", "heyo"], single_response=true);
    // response(() => "I'm doing fine, and you?", ["how", "are", "you", "doing"], required_words=["how"])
    // response(() => getCourseCredit(message), ["what", "is", "the", "course", "credit", "for", /\w{3}\s?\d{3}/i], required_words=["credit", /\w{3}\s?\d{3}/i])
    // response(getCourseCredit(message));
    response(getCurrentHod(message));

    const best_match = getMostLikelyDialog(highest_prob_list);
    // const best_match = Object.keys(highest_prob_list).reduce((acc, curr) => (highest_prob_list[curr] > highest_prob_list[acc]) ? curr : acc);

    return best_match.response();
}

const autoResponse = (history, message) => {
    message = message.toLowerCase();
    split_message = message.split(/\s+|[,;?!.-]\s*/i);
    const response = checkAllMessages(split_message);

    return response;



    // return "I am a chatbot";
}

module.exports = {autoResponse}