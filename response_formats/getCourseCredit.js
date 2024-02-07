const data = require("../data.json");
const {Dialog} = require("../dialog");

const creditLoadRegex = /\w{3}\s?\d{3}/i;

const getCourseCredit = (message, matches) => {
    let result = message.match(creditLoadRegex)?.[0];

    const course = data["courses"].find(
        (course) => course.code.toLowerCase() === result.replaceAll(" ", "")
    );

    return new Dialog(
        () => {
            if (result && course)
                return `The credit load for ${result} is ${course.credits} credits`;
            else if (result)
                return `There is no such course as ${result}`
        },
        [creditLoadRegex, "credit"],
        ["What", "is", "credit", "load", "for", creditLoadRegex]
    );
};

module.exports = {getCourseCredit};
