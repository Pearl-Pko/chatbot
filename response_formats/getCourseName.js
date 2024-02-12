const data = require("../data.json");
const {Dialog} = require("../dialog");

const creditLoadRegex = /\w{3}\s?\d{3}/i;

const getCourseName = (message) => {
    return new Dialog(
        () => {
            const result = message.match(creditLoadRegex)?.[0];

            const course = data["courses"].find(
                (course) =>
                    course.code.toLowerCase() === result.replaceAll(" ", "")
            );
            if (result && course)
                return `The course name of ${result} is "${course.name}"`;
            else if (result) return `There is no such course as ${result}`;
        },
        [creditLoadRegex, "name"],
        ["course", "name", creditLoadRegex]
    );
};

module.exports = {getCourseName};
