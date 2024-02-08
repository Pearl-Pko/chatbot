const {Dialog} = require("../dialog");

const getInvalidResponse = () => {
    return new Dialog(() => "I do not understand your question. Please feel free to ask again", [], [])
}

module.exports = {getInvalidResponse}