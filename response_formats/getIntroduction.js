const data = require("../data.json");
const {Dialog} = require("../dialog");

const getIntroduction = (message) => {
    return new Dialog(
        () => {
            return "Hello! I am a bot that can assist you with information about Uniben. How can I help you?"
        },
        [],
        ["hey", "hello", "hi", "sup"]
    );
};

module.exports = {getIntroduction};
