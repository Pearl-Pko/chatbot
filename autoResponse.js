const { getCourseCrKponse} = require("./response_formats/getInvalidResponse");
const {buildDialogTree} = require("./buildDialogTree")


const matchToken = (str, searchToken) => {
    //this supports matching both strings and regular expressions
    if (typeof searchToken === "string")
        return str.includes(searchToken);
    else if (searchToken instanceof RegExp)
        return searchToken.test(str);
}

const messageProbability = (userMessage, recognisedWords, requiredWords=[]) => {
    let messageCertainty = 0
    let hasRequiredWords = true;

    for (const word of recognisedWords) {
        if (matchToken(userMessage, word)) {
            messageCertainty += 1;
        }
    }

    percentage = (recognisedWords.length) ? messageCertainty / recognisedWords.length : 0;

    for (const word of requiredWords)
    {
        if (!matchToken(userMessage, word)) {
            hasRequiredWords = false;
            break;
        }
    }

    return (hasRequiredWords) ? percentage : 0;
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
        highest_prob_list.set(dialog, messageProbability(message, dialog.recognisedWords, dialog.requiredWords));
    };

    // response(() => 'Hello!', ["hello", "hi", "sup", "hey", "heyo"], single_response=true);
    // response(() => "I'm doing fine, and you?", ["how", "are", "you", "doing"], required_words=["how"])
    buildDialogTree(response, message);

    const best_match = getMostLikelyDialog(highest_prob_list);
    // console.log(highest_prob_list)
    // const best_match = Object.keys(highest_prob_list).reduce((acc, curr) => (highest_prob_list[curr] > highest_prob_list[acc]) ? curr : acc);

    return best_match.response();
}

const autoResponse = (history, message) => {
    message = message.toLowerCase();
    split_message = message.split(/\s+|[,;?!.-]\s*/i);
    const response = checkAllMessages(message);

    return response;
}

module.exports = {autoResponse}