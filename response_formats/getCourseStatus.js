const data = require("../data.json");
const {Dialog} = require("../dialog");

const creditLoadRegex = /\w{3}\s?\d{3}/i;

const getCourseStatus = (message) => {
    return new Dialog(
        () => {
            const result = message.match(creditLoadRegex)?.[0];

            const course = data["courses"].find(
                (course) =>
                    course.code.toLowerCase() === result.replaceAll(" ", "")
            );
            if (result && course)
                return `${course.code} is ${
                    ["a", "e", "i", "o", "u"].includes(course.status[0].toLowerCase())
                        ? "an"
                        : "a"
                } ${course.status.toLowerCase()} course`;
            else if (result) return `There is no such course as ${result}`;
        },
        [creditLoadRegex, "status"],
        ["status", "of", "what", creditLoadRegex]
    );
};

module.exports = {getCourseStatus};
